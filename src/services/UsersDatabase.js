import firebase from "firebase/app";
import "firebase/firestore";

class UsersDatabase {
  constructor(config = {}) {
    if (!UsersDatabase.defaultApp) {
      UsersDatabase.defaultApp = firebase.initializeApp(config);
    }
    this.firestore = firebase.firestore();
    this.firestore.settings({
      timestampsInSnapshots: true
    });
    this.usersCollection = this.firestore.collection("users");
    this.users = {};
  }

  data = id => (id ? this.users[id] : this.users);

  get = () =>
    this.usersCollection
      .orderBy("name")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.users[doc.id] = doc.data();
        });
      })
      .then(() => this.users);

  post = (user = {}) =>
    this.usersCollection
      .add(user)
      .then(docRef => {
        this.users[docRef.id] = user;
      })
      .catch(err =>
        console.error("An error ocurred when pushing a new user", err)
      )
      .finally(() => this.users);
}

UsersDatabase.defaultApp = undefined;
let usersDatabaseSingleton = null;

export default function(opts) {
  if (!usersDatabaseSingleton) {
    usersDatabaseSingleton = new UsersDatabase(opts);
  }

  return usersDatabaseSingleton;
}
