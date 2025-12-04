// src/components/utils.js

// Lista de especialidades para o Picker
export const ESPECIALIDADES_MEDICAS = [
  { label: 'Selecione uma especialidade', value: '' },
  { label: 'Cardiologia',       value: 'CARDIOLOGIA' },
  { label: 'Pediatria',         value: 'PEDIATRIA' },
  { label: 'Dermatologia',      value: 'DERMATOLOGIA' },
  { label: 'Ginecologia',       value: 'GINECOLOGIA' },
  { label: 'Neurologia',        value: 'NEUROLOGIA' },
  { label: 'Clínica Geral',     value: 'CLINICA_GERAL' },
  { label: 'Ortopedia',         value: 'ORTOPEDIA' },
  { label: 'Psiquiatria',       value: 'PSIQUIATRIA' },
  { label: 'Endocrinologia',    value: 'ENDOCRINOLOGIA' },
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
  especialidade: '',     
  email: '',
  telefone: '',
  logradouro: '',
  numero: '',
  complemento: '',
  bairro: '',            
  cep: '',                
  cidade: '',
  uf: UFS_BRASIL[0],
};