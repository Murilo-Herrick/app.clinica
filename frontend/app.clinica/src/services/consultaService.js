// src/services/consultaService.js
import api from "./api";

// Agendar consulta (POST /consultas)
export async function agendarConsulta(dados) {
  const response = await api.post("/consultas", dados);
  // retorna DadosDetalhamentoConsulta
  return response.data;
}

// Cancelar consulta (POST /consultas/cancelar)
export async function cancelarConsulta(dados) {
  await api.post("/consultas/cancelar", dados);
}
