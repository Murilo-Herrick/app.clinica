// src/services/pacienteService.js
import api from "./api";

// Lista pacientes (Page<DadosListagemPacientes>)
export async function listarPacientes(page = 0, size = 20) {
  const response = await api.get("/pacientes", {
    params: { page, size },
  });

  // API retorna: { content: [...], totalElements, totalPages, ... }
  return response.data.content ?? [];
}

// Cadastra paciente (POST /pacientes)
export async function cadastrarPaciente(dados) {
  // Espera:
  // {
  //   nome, email, telefone, cpf,
  //   endereco: { logradouro, bairro, cep, cidade, uf, numero, complemento }
  // }
  const response = await api.post("/pacientes", dados);
  // retorna DadosDetalhamentoPaciente
  return response.data;
}

// Atualiza paciente (PUT /pacientes)
export async function atualizarPaciente(dados) {
  // Espera: { id, nome?, telefone?, endereco? }
  const response = await api.put("/pacientes", dados);
  return response.data;
}

// Exclui (soft delete) paciente (DELETE /pacientes/{id})
export async function excluirPaciente(id) {
  await api.delete(`/pacientes/${id}`);
}
