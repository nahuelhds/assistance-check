import FirebaseApp from "./Firebase";

class FirebaseMessaging {
  constructor(config = {}) {
    this.handleMessage = config.handleMessage;
  }

  requestPermission() {
    const messaging = new FirebaseApp().messaging();

    if (this.handleMessage) {
      messaging.onMessage(this.handleMessage);
    }

    return messaging.requestPermission().then(() => messaging.getToken());
  }
}

FirebaseMessaging.defaultApp = undefined;

export default FirebaseMessaging;
