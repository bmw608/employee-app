import axios from "axios";

const api = axios.create({
  baseURL: "https://uninntromittive-unmanoeuvred-tania.ngrok-free.dev/api",  // BACKEND BASE URL
});

export default api;
