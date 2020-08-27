export const firebaseSettings = {
  apiKey: "AIzaSyB5J-4ANPidBHK8_7fuBVPoHitxK9GPYhk",
  authDomain: "gull-vue.firebaseapp.com",
  databaseURL: "https://gull-vue.firebaseio.com",
  projectId: "gull-vue",
  storageBucket: "",
  messagingSenderId: "418473219984",
  appId: "1:418473219984:web:83d917d20e29e506"
};

// Config for REST API backend
export const restApiSettings = {
  baseURL:  `${process.env.VUE_APP_API_BASE_URL}` || "http://localhost:8000/api/v1",
};
