// src/components/utils.js

// Lista de especialidades para o Picker
export const ESPECIALIDADES_MEDICAS = [
  'Selecione uma especialidade',
  'Cardiologia',
  'Pediatria',
  'Dermatologia',
  'Ginecologia',
  'Neurologia',
  'Clínica Geral',
  'Ortopedia',
  'Psiquiatria',
  'Endocrinologia',
];

// Lista de UFs do Brasil para o Picker
export const UFS_BRASIL = [
  'UF',
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO',
  'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI',
  'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO',
];

// Modelo base de médico usado pelo FormularioMedico
export const MEDICO_MODELO = {
  nome: '',
  crm: '',
  especialidade: ESPECIALIDADES_MEDICAS[0],
  email: '',
  telefone: '',
  logradouro: '',
  numero: '',
  complemento: '',
  cidade: '',
  uf: UFS_BRASIL[0],
};