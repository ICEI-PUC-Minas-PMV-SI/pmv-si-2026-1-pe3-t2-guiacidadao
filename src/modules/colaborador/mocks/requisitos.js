export const requisitoCategories = [
  { value: 'renda', label: 'Renda' },
  { value: 'familia', label: 'Família' },
  { value: 'vinculo', label: 'Vínculo de trabalho' },
  { value: 'moradia', label: 'Moradia' },
  { value: 'documental', label: 'Documental' }
]

export const operadores = [
  { value: 'lte', label: '≤ (menor ou igual)' },
  { value: 'gte', label: '≥ (maior ou igual)' },
  { value: 'eq', label: '= (igual)' },
  { value: 'lt', label: '< (menor que)' },
  { value: 'gt', label: '> (maior que)' }
]

export const requisitos = [
  {
    id: 'req-1',
    name: 'Renda per capita ≤ R$ 218',
    category: 'renda',
    description: 'A soma da renda da família dividida pelo número de pessoas deve ser igual ou inferior a R$ 218,00.',
    operator: 'lte',
    value: '218.00',
    status: 'ativo',
    benefitsLinked: 8
  },
  {
    id: 'req-2',
    name: 'Renda per capita ≤ R$ 660',
    category: 'renda',
    description: 'A soma da renda da família dividida pelo número de pessoas deve ser igual ou inferior a R$ 660,00.',
    operator: 'lte',
    value: '660.00',
    status: 'ativo',
    benefitsLinked: 5
  },
  {
    id: 'req-3',
    name: 'Família com ≥ 2 membros',
    category: 'familia',
    description: 'A família deve ter pelo menos duas pessoas residindo no mesmo domicílio.',
    operator: 'gte',
    value: '2',
    status: 'ativo',
    benefitsLinked: 3
  },
  {
    id: 'req-4',
    name: 'Desempregado ou informal',
    category: 'vinculo',
    description: 'A pessoa não pode estar com vínculo formal de trabalho registrado em carteira.',
    operator: 'eq',
    value: '0',
    status: 'ativo',
    benefitsLinked: 4
  },
  {
    id: 'req-5',
    name: 'Inscrição no CadÚnico',
    category: 'documental',
    description: 'A família deve estar com cadastro atualizado no Cadastro Único para Programas Sociais do Governo Federal.',
    operator: 'eq',
    value: '1',
    status: 'ativo',
    benefitsLinked: 9
  }
]
