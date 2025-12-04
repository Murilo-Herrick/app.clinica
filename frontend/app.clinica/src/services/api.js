import axios from "axios";

// ⚠️ Ajuste o IP conforme onde sua API estiver rodando:
const ip = "192.168.10.135"

const api = axios.create({
  baseURL: `http://${ip}:8080`,
});

export default api;
