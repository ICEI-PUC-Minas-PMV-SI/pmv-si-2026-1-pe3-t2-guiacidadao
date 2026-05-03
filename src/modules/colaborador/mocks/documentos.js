export const documentoCategories = [
  { value: 'identidade', label: 'Identidade' },
  { value: 'renda', label: 'Renda' },
  { value: 'moradia', label: 'Moradia' },
  { value: 'familiar', label: 'Familiar' },
  { value: 'outros', label: 'Outros' }
]

export const documentos = [
  {
    id: 'doc-1',
    name: 'RG',
    category: 'identidade',
    guidance: 'Documento de identidade emitido pela Secretaria de Segurança Pública. Pode ser substituído pela CNH válida.',
    optional: false,
    status: 'ativo'
  },
  {
    id: 'doc-2',
    name: 'CPF',
    category: 'identidade',
    guidance: 'Cadastro de Pessoa Física emitido pela Receita Federal. Disponível também na Carteira de Trabalho Digital.',
    optional: false,
    status: 'ativo'
  },
  {
    id: 'doc-3',
    name: 'Comprovante de renda',
    category: 'renda',
    guidance: 'Holerite recente, contracheque ou declaração de renda. Aceita-se também extrato bancário dos últimos 3 meses.',
    optional: true,
    status: 'ativo'
  },
  {
    id: 'doc-4',
    name: 'Comprovante de residência',
    category: 'moradia',
    guidance: 'Conta de água, luz, telefone ou declaração de residência emitida pela prefeitura.',
    optional: false,
    status: 'ativo'
  },
  {
    id: 'doc-5',
    name: 'Cadastro CadÚnico (NIS)',
    category: 'familiar',
    guidance: 'Número de Identificação Social obtido após cadastro presencial em uma unidade do CRAS.',
    optional: false,
    status: 'ativo'
  }
]
