const MOCK_BENEFICIOS = [
  { id: 'ben-1', name: 'Bolsa Familia', agency: 'Governo Federal / MDS', description: 'Transferencia de renda para familias em situacao de pobreza extrema, com foco no acompanhamento de saude e educacao dos filhos.', requirements: ['req-1', 'req-5'], documents: ['doc-1', 'doc-2', 'doc-5'], officialLink: 'https://www.gov.br/mds/bolsafamilia', status: 'ativo', eligibleCount: 1240, updatedAt: 'ha 2h' },
  { id: 'ben-2', name: 'BPC, Prestacao Continuada', agency: 'INSS', description: 'Beneficio mensal de um salario minimo destinado a idosos a partir de 65 anos e a pessoas com deficiencia em situacao de pobreza.', requirements: ['req-1'], documents: ['doc-1', 'doc-2', 'doc-4'], officialLink: 'https://www.gov.br/inss/bpc', status: 'ativo', eligibleCount: 320, updatedAt: 'ha 1d' },
  { id: 'ben-3', name: 'Tarifa Social de Energia', agency: 'ANEEL / Distribuidoras', description: 'Desconto na tarifa de energia eletrica para familias inscritas no CadUnico ou beneficiarias do BPC.', requirements: ['req-2', 'req-5'], documents: ['doc-2', 'doc-4', 'doc-5'], officialLink: 'https://www.gov.br/aneel/tarifa-social', status: 'ativo', eligibleCount: 870, updatedAt: 'ha 3d' },
  { id: 'ben-4', name: 'Vale-Gas Nacional', agency: 'Governo Federal / MDS', description: 'Auxilio para compra de botijao de gas de cozinha, pago a cada dois meses para familias do CadUnico.', requirements: ['req-2', 'req-5'], documents: ['doc-2', 'doc-5'], officialLink: 'https://www.gov.br/mds/vale-gas', status: 'inativo', eligibleCount: 0, updatedAt: 'ha 7d' },
  { id: 'ben-5', name: 'Seguro-Desemprego', agency: 'Ministerio do Trabalho', description: 'Pagamento de parcelas mensais ao trabalhador formal demitido sem justa causa, durante busca por novo emprego.', requirements: ['req-4'], documents: ['doc-1', 'doc-2', 'doc-3'], officialLink: 'https://www.gov.br/trabalho/seguro-desemprego', status: 'ativo', eligibleCount: 540, updatedAt: 'ha 4h' },
  { id: 'ben-6', name: 'Auxilio-Gas', agency: 'Governo Estadual', description: 'Programa estadual complementar para compra de gas de cozinha em municipios prioritarios.', requirements: ['req-2', 'req-5'], documents: ['doc-2', 'doc-4', 'doc-5'], officialLink: 'https://www.gov.br/estado/auxilio-gas', status: 'pendente', eligibleCount: 0, updatedAt: 'ha 1h' }
];

const MOCK_BENEFICIO_STATUS_OPTIONS = [
  { value: 'todos', label: 'Todos', total: 17 },
  { value: 'ativo', label: 'Ativos', total: 12 },
  { value: 'inativo', label: 'Inativos', total: 3 },
  { value: 'pendente', label: 'Pendentes', total: 2 }
];

globalThis.MOCK_BENEFICIOS = MOCK_BENEFICIOS;
globalThis.MOCK_BENEFICIO_STATUS_OPTIONS = MOCK_BENEFICIO_STATUS_OPTIONS;
