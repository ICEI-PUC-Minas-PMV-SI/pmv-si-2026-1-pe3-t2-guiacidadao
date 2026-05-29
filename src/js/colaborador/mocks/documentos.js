const MOCK_DOCUMENTOS = [
  { id: 'doc-1', name: 'RG', category: 'identidade', guidance: 'Documento de identidade emitido pela Secretaria de Seguranca Publica. Pode ser substituido pela CNH valida.', optional: false, status: 'ativo' },
  { id: 'doc-2', name: 'CPF', category: 'identidade', guidance: 'Cadastro de Pessoa Fisica emitido pela Receita Federal. Disponivel tambem na Carteira de Trabalho Digital.', optional: false, status: 'ativo' },
  { id: 'doc-3', name: 'Comprovante de renda', category: 'renda', guidance: 'Holerite recente, contracheque ou declaracao de renda. Aceita-se tambem extrato bancario dos ultimos 3 meses.', optional: true, status: 'ativo' },
  { id: 'doc-4', name: 'Comprovante de residencia', category: 'moradia', guidance: 'Conta de agua, luz, telefone ou declaracao de residencia emitida pela prefeitura.', optional: false, status: 'ativo' },
  { id: 'doc-5', name: 'Cadastro CadUnico (NIS)', category: 'familiar', guidance: 'Numero de Identificacao Social obtido apos cadastro presencial em uma unidade do CRAS.', optional: false, status: 'ativo' }
];

const MOCK_DOCUMENTO_CATEGORIES = [
  { value: 'identidade', label: 'Identidade' },
  { value: 'renda', label: 'Renda' },
  { value: 'moradia', label: 'Moradia' },
  { value: 'familiar', label: 'Familiar' },
  { value: 'outros', label: 'Outros' }
];

globalThis.MOCK_DOCUMENTOS = MOCK_DOCUMENTOS;
globalThis.MOCK_DOCUMENTO_CATEGORIES = MOCK_DOCUMENTO_CATEGORIES;
