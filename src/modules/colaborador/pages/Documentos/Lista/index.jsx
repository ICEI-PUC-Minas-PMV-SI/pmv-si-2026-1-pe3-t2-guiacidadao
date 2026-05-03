import { useNavigate } from 'react-router-dom'
import { useMemo, useState } from 'react'

import FilterPill from '../../../components/FilterPill'
import Header from '../../../components/Header'
import IconButton from '../../../components/IconButton'
import ListItem from '../../../components/ListItem'
import ScreenLayout from '../../../components/ScreenLayout'
import SearchBar from '../../../../../components/SearchBar'
import { documentoCategories, documentos } from '../../../mocks/documentos'
import { styles } from './styles'

const filters = [{ value: 'todos', label: 'Todos' }, ...documentoCategories]

const labelByCategory = documentoCategories.reduce((acc, item) => {
  acc[item.value] = item.label
  return acc
}, {})

const Lista = () => {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('todos')

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase()
    return documentos.filter((doc) => {
      const matchesSearch = !term || doc.name.toLowerCase().includes(term)
      const matchesFilter = filter === 'todos' || doc.category === filter
      return matchesSearch && matchesFilter
    })
  }, [search, filter])

  return (
    <ScreenLayout header={<Header title="Biblioteca de Documentos" />}>
      <div style={styles.toolbar}>
        <SearchBar value={search} onChange={setSearch} placeholder="Buscar documento..." />
        <IconButton ariaLabel="Adicionar documento" onClick={() => navigate('/colaborador/documentos/novo')} />
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
        <span style={styles.countLabel}>Documentos cadastrados</span>
        <span style={styles.countTotal}>{filtered.length} no total</span>
      </div>
      <div style={styles.list}>
        {filtered.map((doc) => (
          <ListItem
            key={doc.id}
            title={doc.name}
            subtitle={labelByCategory[doc.category] ?? '—'}
            onClick={() => navigate(`/colaborador/documentos/${doc.id}/editar`)}
          />
        ))}
      </div>
    </ScreenLayout>
  )
}

export default Lista
