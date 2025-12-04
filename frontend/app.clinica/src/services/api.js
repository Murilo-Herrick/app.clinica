import axios from "axios";

// ⚠️ Ajuste esta URL conforme onde sua API estiver rodando:
// - Emulador Android: http://10.0.2.2:8080
// - Emulador iOS: http://localhost:8080
// - Celular físico: http://IP_DA_SUA_MAQUINA:8080
const api = axios.create({
  baseURL: "http://192.168.15.8:8080",
});

export default api;
