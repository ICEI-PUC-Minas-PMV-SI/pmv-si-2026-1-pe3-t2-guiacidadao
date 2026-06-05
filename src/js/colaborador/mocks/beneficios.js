const MOCK_BENEFICIOS = [
  {
    id: 'ben-1',
    name: 'Bolsa Família',
    agency: 'Governo Federal / MDS',
    description: 'Transferência de renda para famílias em situação de pobreza extrema, com foco no acompanhamento de saúde e educação dos filhos.',
    descricaoLonga: 'O Bolsa Família é o maior programa de transferência de renda do Brasil, reconhecido internacionalmente por já ter tirado milhões de famílias da fome. O Governo Federal relançou o programa com mais proteção às famílias, mais sofisticado e com uma melhor estrutura.',
    quemTemDireito: [
      'Famílias baixa renda com crianças, gestantes e adolescentes até 18 anos inscritos no CadÚnico',
      'Famílias unipessoais dentro da faixa de renda'
    ],
    requisitosRenda: 'Possuir renda familiar per capita (por pessoa) igual ou inferior a R$ 218,00.',
    documentacao: [
      { label: 'CPF', descricao: 'ou documento oficial de todos os moradores da residência' },
      { label: 'RG, CNH ou Carteira de Trabalho', descricao: 'Documento de identificação com foto do requerente' },
      { label: 'Comprovante de residência', descricao: '' },
      { label: 'Declaração Escolar', descricao: '(se necessário)' },
      { label: 'Laudo médico', descricao: '(em caso de pessoa com deficiência)' }
    ],
    icon: '/src/assets/icons/bolsafamilia.png',
    cor: '#F9BEBF',
    requirements: ['req-1', 'req-5'],
    documents: ['doc-1', 'doc-2', 'doc-5'],
    officialLink: 'https://www.gov.br/mds/bolsafamilia',
    status: 'ativo',
    eligibleCount: 1240,
    updatedAt: 'há 2h'
  },
  {
    id: 'ben-2',
    name: 'BPC (Benefício de Prestação Continuada)',
    agency: 'INSS',
    description: 'Benefício mensal de um salário mínimo destinado a idosos a partir de 65 anos e a pessoas com deficiência em situação de pobreza.',
    descricaoLonga: 'O BPC garante um salário mínimo por mês à pessoa idosa com idade igual ou superior a 65 anos e à pessoa com deficiência de qualquer idade que comprove, em ambos os casos, ser família de baixa renda.',
    quemTemDireito: [
      'Pessoas baixa renda com 65+ anos',
      'Pessoas baixa renda com deficiência de qualquer idade'
    ],
    requisitosRenda: 'Possuir renda familiar per capita (por pessoa) igual ou inferior a 1/4 do salário mínimo vigente (R$ 1.621,00 em 2026).',
    documentacao: [
      { label: 'CPF', descricao: 'De todos os membros familiares que moram na mesma casa' },
      { label: 'RG, CNH ou Carteira de Trabalho', descricao: 'Documento de identificação com foto do requerente' },
      { label: 'Certidão de Nascimento ou Casamento', descricao: '' },
      { label: 'Cadastro Único (CadÚnico)', descricao: 'Atualizado há menos de dois anos na data do requerimento' },
      { label: 'Comprovante de Residência', descricao: 'Atualizado (conta de luz, água ou telefone)' }
    ],
    icon: '/src/assets/icons/bpc.png',
    cor: '#D9EEFF',
    requirements: ['req-1'],
    documents: ['doc-1', 'doc-2', 'doc-4'],
    officialLink: 'https://www.gov.br/inss/bpc',
    status: 'ativo',
    eligibleCount: 320,
    updatedAt: 'há 1d'
  },
  {
    id: 'ben-3',
    name: 'TSEE (Tarifa Social de Energia Elétrica)',
    agency: 'ANEEL / Distribuidoras',
    description: 'Desconto na tarifa de energia elétrica para famílias inscritas no CadÚnico ou beneficiárias do BPC.',
    descricaoLonga: 'A Tarifa Social de Energia Elétrica - TSEE é uma política pública de descontos na fatura de energia elétrica para famílias de baixa renda e para idosos ou pessoas com deficiência que recebam o Benefício de Prestação Continuada - BPC.',
    quemTemDireito: [
      'Famílias de baixa renda inscritas no CadÚnico',
      'Famílias de baixa renda inscritas no BPC'
    ],
    requisitosRenda: 'Possuir renda familiar per capita (por pessoa) igual ou inferior a 1/2 salário mínimo vigente (R$ 1.621,00 em 2026).',
    documentacao: [
      { label: 'CPF', descricao: 'do responsável familiar' },
      { label: 'RG, CNH ou Carteira de Trabalho', descricao: 'Documento de identificação com foto do requerente' },
      { label: 'Número da Unidade Consumidora', descricao: 'encontrado na conta de luz' },
      { label: 'NIS (Número de Identificação Social)', descricao: 'Atualizado no CadÚnico' },
      { label: 'NB (Número do Benefício)', descricao: 'para quem recebe o BPC' }
    ],
    icon: '/src/assets/icons/tsee.png',
    cor: '#F9F3CA',
    requirements: ['req-2', 'req-5'],
    documents: ['doc-2', 'doc-4', 'doc-5'],
    officialLink: 'https://www.gov.br/aneel/tarifa-social',
    status: 'ativo',
    eligibleCount: 870,
    updatedAt: 'há 3d'
  },
  {
    id: 'ben-4',
    name: 'Auxílio Gás',
    agency: 'Governo Federal / MDS',
    description: 'Auxílio para compra de botijão de gás de cozinha, pago a cada dois meses para famílias do CadÚnico.',
    descricaoLonga: 'O Auxílio Gás é a nova política federal que amplia e fortalece o acesso ao gás de cozinha no Brasil, garantindo a gratuidade na recarga do botijão GLP (13kg) em revendas credenciadas.',
    quemTemDireito: [
      'Famílias de baixa renda inscritas no CadÚnico'
    ],
    requisitosRenda: 'Possuir renda familiar per capita (por pessoa) igual ou inferior a 1/2 salário mínimo vigente (R$ 1.621,00 em 2026).',
    documentacao: [
      { label: 'CPF', descricao: 'Do responsável familiar' },
      { label: 'RG, CNH ou Carteira de Trabalho', descricao: 'Documento de identificação com foto do requerente' },
      { label: 'Cadastro Único (CadÚnico)', descricao: 'Atualizado há menos de dois anos na data do requerimento' },
      { label: 'Cartão do Bolsa Família ou Débito da Caixa', descricao: '' }
    ],
    icon: '/src/assets/icons/auxiliogas.png',
    cor: '#FFD0AE',
    requirements: ['req-2', 'req-5'],
    documents: ['doc-2', 'doc-5'],
    officialLink: 'https://www.gov.br/mds/vale-gas',
    status: 'ativo',
    eligibleCount: 0,
    updatedAt: 'há 7d'
  },
  {
    id: 'ben-5',
    name: 'Seguro-Desemprego',
    agency: 'Ministério do Trabalho',
    description: 'Pagamento de parcelas mensais ao trabalhador formal demitido sem justa causa, durante busca por novo emprego.',
    descricaoLonga: '',
    quemTemDireito: [],
    requisitosRenda: '',
    documentacao: [],
    icon: '',
    cor: '#E0E0E0',
    requirements: ['req-4'],
    documents: ['doc-1', 'doc-2', 'doc-3'],
    officialLink: 'https://www.gov.br/trabalho/seguro-desemprego',
    status: 'ativo',
    eligibleCount: 540,
    updatedAt: 'há 4h'
  },
  {
    id: 'ben-6',
    name: 'Auxílio-Gás Estadual',
    agency: 'Governo Estadual',
    description: 'Programa estadual complementar para compra de gás de cozinha em municípios prioritários.',
    descricaoLonga: '',
    quemTemDireito: [],
    requisitosRenda: '',
    documentacao: [],
    icon: '',
    cor: '#E0E0E0',
    requirements: ['req-2', 'req-5'],
    documents: ['doc-2', 'doc-4', 'doc-5'],
    officialLink: 'https://www.gov.br/estado/auxilio-gas',
    status: 'pendente',
    eligibleCount: 0,
    updatedAt: 'há 1h'
  },
  {
    id: 'ben-7',
    name: 'Auxílio Acidente',
    agency: 'INSS',
    description: 'Benefício indenizatório pago ao segurado do INSS que apresentar sequela permanente após acidente.',
    descricaoLonga: 'O Auxílio Acidente é um benefício de natureza indenizatória pago ao segurado do INSS quando, em decorrência de acidente, apresentar sequela permanente que reduza definitivamente sua capacidade para o trabalho.',
    quemTemDireito: [
      'Pessoa que esteja trabalhando ou contribuindo para o INSS no momento do acidente',
      'Pessoa que sofreu uma sequela permanente em acidente de qualquer natureza'
    ],
    requisitosRenda: 'Não há.',
    documentacao: [
      { label: 'RG, CNH ou Carteira de Trabalho', descricao: 'Documento de identificação com foto do requerente' },
      { label: 'Carteira de Trabalho', descricao: '' },
      { label: 'Laudos médicos, exames, prontuários e atestado', descricao: 'que comprovem o acidente e a sequela permanente' },
      { label: 'CAT (Comunicação de Acidente de Trabalho)', descricao: 'se for acidente de trabalho' }
    ],
    icon: '/src/assets/icons/auxilioacidente.png',
    cor: '#E6D5F8',
    requirements: [],
    documents: ['doc-1', 'doc-2'],
    officialLink: 'https://www.gov.br/inss/auxilio-acidente',
    status: 'ativo',
    eligibleCount: 180,
    updatedAt: 'há 5h'
  },
  {
    id: 'ben-8',
    name: 'CadÚnico (Cadastro Único)',
    agency: 'Governo Federal / MDS',
    description: 'Porta de entrada para programas sociais do Governo Federal. Identifica e caracteriza famílias de baixa renda.',
    descricaoLonga: 'O Cadastro Único para Programas Sociais identifica e caracteriza as famílias de baixa renda residentes em todo território nacional. Ele é a porta de entrada para demais programas sociais.',
    quemTemDireito: [
      'Famílias de baixa renda que buscam acesso a programas sociais do Governo Federal',
      'Pessoas que moram sozinhas e se encaixem nos critérios de renda'
    ],
    requisitosRenda: 'Possuir renda familiar per capita (por pessoa) igual ou inferior a 1/2 salário mínimo vigente (R$ 1.621,00 em 2026).',
    documentacao: [
      { label: 'CPF', descricao: 'ou documento oficial de todos os moradores da residência' },
      { label: 'RG, CNH ou Carteira de Trabalho', descricao: 'Documento de identificação com foto do requerente' },
      { label: 'Comprovante de residência', descricao: '' },
      { label: 'Declaração Escolar', descricao: '(se necessário)' },
      { label: 'Laudo médico', descricao: '(em caso de pessoa com deficiência)' }
    ],
    icon: '/src/assets/icons/cadunico.png',
    cor: '#CCF3CC',
    requirements: ['req-2'],
    documents: ['doc-1', 'doc-2', 'doc-4'],
    officialLink: 'https://cadunico.dataprev.gov.br',
    status: 'ativo',
    eligibleCount: 2150,
    updatedAt: 'há 6h'
  }
];

const MOCK_BENEFICIO_STATUS_OPTIONS = [
  { value: 'todos', label: 'Todos', total: 17 },
  { value: 'ativo', label: 'Ativos', total: 12 },
  { value: 'inativo', label: 'Inativos', total: 3 },
  { value: 'pendente', label: 'Pendentes', total: 2 }
];

globalThis.MOCK_BENEFICIOS = MOCK_BENEFICIOS;
globalThis.MOCK_BENEFICIO_STATUS_OPTIONS = MOCK_BENEFICIO_STATUS_OPTIONS;

if (typeof registrarSeed === 'function') {
  registrarSeed('beneficios', MOCK_BENEFICIOS);
}
