import FirebaseApp from "./Firebase";

class FirebaseMessaging {
  constructor(config = {}) {
    config = Object.assign({ handleMessage: () => {} }, config);
    this.messaging = new FirebaseApp().messaging();
    this.handleMessage = config.handleMessage ;
  }

  requestPermission() {
    if (this.handleMessage) {
      this.messaging.onMessage(this.handleMessage);
    }

    return this.messaging
      .requestPermission()
      .then(() => this.messaging.getToken());
  }
}

export default FirebaseMessaging;
