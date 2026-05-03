export const beneficios = [
  {
    id: 'ben-1',
    name: 'Bolsa Família',
    agency: 'Governo Federal / MDS',
    description: 'Transferência de renda para famílias em situação de pobreza extrema, com foco no acompanhamento de saúde e educação dos filhos.',
    requirements: ['req-1', 'req-5'],
    documents: ['doc-1', 'doc-2', 'doc-5'],
    officialLink: 'https://www.gov.br/mds/bolsafamilia',
    status: 'ativo',
    eligibleCount: 1240,
    updatedAt: 'há 2h'
  },
  {
    id: 'ben-2',
    name: 'BPC, Prestação Continuada',
    agency: 'INSS',
    description: 'Benefício mensal de um salário mínimo destinado a idosos a partir de 65 anos e a pessoas com deficiência em situação de pobreza.',
    requirements: ['req-1'],
    documents: ['doc-1', 'doc-2', 'doc-4'],
    officialLink: 'https://www.gov.br/inss/bpc',
    status: 'ativo',
    eligibleCount: 320,
    updatedAt: 'há 1d'
  },
  {
    id: 'ben-3',
    name: 'Tarifa Social de Energia',
    agency: 'ANEEL / Distribuidoras',
    description: 'Desconto na tarifa de energia elétrica para famílias inscritas no CadÚnico ou beneficiárias do BPC.',
    requirements: ['req-2', 'req-5'],
    documents: ['doc-2', 'doc-4', 'doc-5'],
    officialLink: 'https://www.gov.br/aneel/tarifa-social',
    status: 'ativo',
    eligibleCount: 870,
    updatedAt: 'há 3d'
  },
  {
    id: 'ben-4',
    name: 'Vale-Gás Nacional',
    agency: 'Governo Federal / MDS',
    description: 'Auxílio para compra de botijão de gás de cozinha, pago a cada dois meses para famílias do CadÚnico.',
    requirements: ['req-2', 'req-5'],
    documents: ['doc-2', 'doc-5'],
    officialLink: 'https://www.gov.br/mds/vale-gas',
    status: 'inativo',
    eligibleCount: 0,
    updatedAt: 'há 7d'
  },
  {
    id: 'ben-5',
    name: 'Seguro-Desemprego',
    agency: 'Ministério do Trabalho',
    description: 'Pagamento de parcelas mensais ao trabalhador formal demitido sem justa causa, durante busca por novo emprego.',
    requirements: ['req-4'],
    documents: ['doc-1', 'doc-2', 'doc-3'],
    officialLink: 'https://www.gov.br/trabalho/seguro-desemprego',
    status: 'ativo',
    eligibleCount: 540,
    updatedAt: 'há 4h'
  },
  {
    id: 'ben-6',
    name: 'Auxílio-Gás',
    agency: 'Governo Estadual',
    description: 'Programa estadual complementar para compra de gás de cozinha em municípios prioritários.',
    requirements: ['req-2', 'req-5'],
    documents: ['doc-2', 'doc-4', 'doc-5'],
    officialLink: 'https://www.gov.br/estado/auxilio-gas',
    status: 'pendente',
    eligibleCount: 0,
    updatedAt: 'há 1h'
  }
]

export const beneficioStatusOptions = [
  { value: 'todos', label: 'Todos', total: 17 },
  { value: 'ativo', label: 'Ativos', total: 12 },
  { value: 'inativo', label: 'Inativos', total: 3 },
  { value: 'pendente', label: 'Pendentes', total: 2 }
]
