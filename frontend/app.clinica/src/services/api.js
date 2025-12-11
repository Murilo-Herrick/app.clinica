import axios from "axios";

// ⚠️ Ajuste o IP conforme onde sua API estiver rodando:
const ip = "10.110.12.28"

const api = axios.create({
  baseURL: `http://${ip}:8080`,
});

export default api;
