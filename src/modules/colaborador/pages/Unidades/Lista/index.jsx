import { useNavigate } from 'react-router-dom'
import { useMemo, useState } from 'react'

import Badge from '../../../../../components/Badge'
import FilterPill from '../../../components/FilterPill'
import Header from '../../../components/Header'
import IconButton from '../../../components/IconButton'
import ListItem from '../../../components/ListItem'
import ScreenLayout from '../../../components/ScreenLayout'
import SearchBar from '../../../../../components/SearchBar'
import { unidadeTypes, unidades } from '../../../mocks/unidades'
import { styles } from './styles'

const filters = [{ value: 'todos', label: 'Todos' }, ...unidadeTypes]

const labelByType = unidadeTypes.reduce((acc, item) => {
  acc[item.value] = item.label
  return acc
}, {})

const Lista = () => {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('todos')

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase()
    return unidades.filter((unidade) => {
      const matchesSearch = !term || unidade.name.toLowerCase().includes(term) || unidade.address.toLowerCase().includes(term)
      const matchesFilter = filter === 'todos' || unidade.type === filter
      return matchesSearch && matchesFilter
    })
  }, [search, filter])

  return (
    <ScreenLayout header={<Header title="Unidades de Atendimento" />}>
      <div style={styles.toolbar}>
        <SearchBar value={search} onChange={setSearch} placeholder="Buscar unidade..." />
        <IconButton ariaLabel="Adicionar unidade" onClick={() => navigate('/colaborador/unidades/nova')} />
      </div>
      <div style={styles.filters}>
        {filters.map((option) => (
          <FilterPill
            key={option.value}
            label={option.label}
            active={filter === option.value}
            onClick={() => setFilter(option.value)}
          />
        ))}
      </div>
      <div style={styles.countRow}>
        <span style={styles.countLabel}>Unidades cadastradas</span>
        <span style={styles.countTotal}>{filtered.length} no total</span>
      </div>
      <div style={styles.list}>
        {filtered.map((unidade) => (
          <ListItem
            key={unidade.id}
            title={unidade.name}
            subtitle={`${labelByType[unidade.type] ?? unidade.type} · ${unidade.address}`}
            badge={unidade.status === 'inativo' ? <Badge variant="inativo">Inativo</Badge> : null}
            onClick={() => navigate(`/colaborador/unidades/${unidade.id}/editar`)}
          />
        ))}
      </div>
    </ScreenLayout>
  )
}

export default Lista
