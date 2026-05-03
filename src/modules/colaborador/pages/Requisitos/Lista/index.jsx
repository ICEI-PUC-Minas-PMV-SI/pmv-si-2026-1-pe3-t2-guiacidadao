import { useNavigate } from 'react-router-dom'
import { useMemo, useState } from 'react'

import FilterPill from '../../../components/FilterPill'
import Header from '../../../components/Header'
import IconButton from '../../../components/IconButton'
import ListItem from '../../../components/ListItem'
import ScreenLayout from '../../../components/ScreenLayout'
import SearchBar from '../../../../../components/SearchBar'
import { requisitoCategories, requisitos } from '../../../mocks/requisitos'
import { styles } from './styles'

const filters = [{ value: 'todos', label: 'Todos' }, ...requisitoCategories]

const Lista = () => {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('todos')

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase()
    return requisitos.filter((req) => {
      const matchesSearch = !term || req.name.toLowerCase().includes(term)
      const matchesFilter = filter === 'todos' || req.category === filter
      return matchesSearch && matchesFilter
    })
  }, [search, filter])

  return (
    <ScreenLayout header={<Header title="Biblioteca de Requisitos" />}>
      <div style={styles.toolbar}>
        <SearchBar value={search} onChange={setSearch} placeholder="Buscar requisito..." />
        <IconButton ariaLabel="Adicionar requisito" onClick={() => navigate('/colaborador/requisitos/novo')} />
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
        <span style={styles.countLabel}>Requisitos cadastrados</span>
        <span style={styles.countTotal}>{filtered.length} no total</span>
      </div>
      <div style={styles.list}>
        {filtered.map((req) => (
          <ListItem
            key={req.id}
            title={req.name}
            subtitle={`${req.benefitsLinked} benefícios vinculados`}
            onClick={() => navigate(`/colaborador/requisitos/${req.id}/editar`)}
          />
        ))}
      </div>
    </ScreenLayout>
  )
}

export default Lista
