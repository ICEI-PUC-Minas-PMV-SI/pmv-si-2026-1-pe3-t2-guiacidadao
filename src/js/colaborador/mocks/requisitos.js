const MOCK_REQUISITOS = [
  { id: 'req-1', name: 'Renda per capita <= R$ 218', category: 'renda', description: 'A soma da renda da familia dividida pelo numero de pessoas deve ser igual ou inferior a R$ 218,00.', operator: 'lte', value: '218.00', status: 'ativo', benefitsLinked: 8 },
  { id: 'req-2', name: 'Renda per capita <= R$ 660', category: 'renda', description: 'A soma da renda da familia dividida pelo numero de pessoas deve ser igual ou inferior a R$ 660,00.', operator: 'lte', value: '660.00', status: 'ativo', benefitsLinked: 5 },
  { id: 'req-3', name: 'Familia com >= 2 membros', category: 'familia', description: 'A familia deve ter pelo menos duas pessoas residindo no mesmo domicilio.', operator: 'gte', value: '2', status: 'ativo', benefitsLinked: 3 },
  { id: 'req-4', name: 'Desempregado ou informal', category: 'vinculo', description: 'A pessoa nao pode estar com vinculo formal de trabalho registrado em carteira.', operator: 'eq', value: '0', status: 'ativo', benefitsLinked: 4 },
  { id: 'req-5', name: 'Inscricao no CadUnico', category: 'documental', description: 'A familia deve estar com cadastro atualizado no Cadastro Unico para Programas Sociais do Governo Federal.', operator: 'eq', value: '1', status: 'ativo', benefitsLinked: 9 }
];

const MOCK_REQUISITO_CATEGORIES = [
  { value: 'renda', label: 'Renda' },
  { value: 'familia', label: 'Familia' },
  { value: 'vinculo', label: 'Vinculo de trabalho' },
  { value: 'moradia', label: 'Moradia' },
  { value: 'documental', label: 'Documental' }
];

const MOCK_OPERADORES = [
  { value: 'lte', label: '<= (menor ou igual)' },
  { value: 'gte', label: '>= (maior ou igual)' },
  { value: 'eq', label: '= (igual)' },
  { value: 'lt', label: '< (menor que)' },
  { value: 'gt', label: '> (maior que)' }
];

globalThis.MOCK_REQUISITOS = MOCK_REQUISITOS;
globalThis.MOCK_REQUISITO_CATEGORIES = MOCK_REQUISITO_CATEGORIES;
globalThis.MOCK_OPERADORES = MOCK_OPERADORES;
