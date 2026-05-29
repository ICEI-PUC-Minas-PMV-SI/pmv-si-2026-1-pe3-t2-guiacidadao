const MOCK_UNIDADE_TYPES = [
  { value: 'cras', label: 'CRAS' },
  { value: 'creas', label: 'CREAS' },
  { value: 'inss', label: 'INSS' },
  { value: 'defensoria', label: 'Defensoria Publica' },
  { value: 'prefeitura', label: 'Prefeitura' },
  { value: 'outros', label: 'Outros' }
];

const MOCK_UNIDADES = [
  { id: 'uni-1', name: 'CRAS Centro', type: 'cras', address: 'Rua XV de Novembro, 100, Centro', cep: '30100-000', phone: '(31) 3222-1100', schedule: 'Seg a Sex, 08h as 17h', benefits: ['ben-1', 'ben-2', 'ben-3'], status: 'ativo' },
  { id: 'uni-2', name: 'INSS Bom Retiro', type: 'inss', address: 'Av. Bom Retiro, 555, Bom Retiro', cep: '30150-000', phone: '135', schedule: 'Seg a Sex, 07h as 14h', benefits: ['ben-2', 'ben-5'], status: 'ativo' },
  { id: 'uni-3', name: 'Defensoria Publica', type: 'defensoria', address: 'Praca da Republica, 200, Centro', cep: '30120-000', phone: '(31) 3333-2200', schedule: 'Seg a Sex, 09h as 16h', benefits: ['ben-1', 'ben-2'], status: 'ativo' },
  { id: 'uni-4', name: 'CRAS Norte', type: 'cras', address: 'Rua das Flores, 850, Bairro Norte', cep: '30210-000', phone: '(31) 3221-4400', schedule: 'Seg a Sex, 08h as 17h', benefits: ['ben-1', 'ben-3', 'ben-4'], status: 'ativo' },
  { id: 'uni-5', name: 'CRAS Vila Nova', type: 'cras', address: 'Av. Vila Nova, 1200, Vila Nova', cep: '30350-000', phone: '(31) 3225-7700', schedule: 'Seg a Sex, 08h as 17h', benefits: ['ben-1', 'ben-3'], status: 'inativo' }
];

globalThis.MOCK_UNIDADES = MOCK_UNIDADES;
globalThis.MOCK_UNIDADE_TYPES = MOCK_UNIDADE_TYPES;
