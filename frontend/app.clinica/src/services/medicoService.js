import api from "./api";

// Lista médicos (Spring Data Page)
export async function listarMedicos(page = 0, size = 20) {
  const response = await api.get("/medicos", {
    params: { page, size },
  });

  // API retorna Page<DadosListagemMedicos>:
  // { content: [...], totalElements, totalPages, ... }
  return response.data.content ?? [];
}

// Cadastra médico (POST /medicos)
export async function cadastrarMedico(dados) {
  // dados deve estar no formato de DadosCadastroMedico
  // {
  //   nome, email, telefone, crm, especialidade,
  //   endereco: { logradouro, bairro, cep, cidade, uf, numero, complemento }
  // }
  const response = await api.post("/medicos", dados);
  // retorna DadosDetalhamentoMedico
  return response.data;
}

// Atualiza médico (PUT /medicos)
export async function atualizarMedico(dados) {
  // Backend espera DadosAtualizacaoMedico:
  // { id, nome?, telefone?, endereco? }
  const response = await api.put("/medicos", dados);
  return response.data;
}

// Exclui (soft-delete) médico (DELETE /medicos/{id})
export async function excluirMedico(id) {
  await api.delete(`/medicos/${id}`);
}

export async function detalharMedico(id) {
  const response = await api.get(`/medicos/${id}`);
  // backend retorna DadosDetalhamentoMedico (inclui telefone, endereco completo etc)
  return response.data;
}
