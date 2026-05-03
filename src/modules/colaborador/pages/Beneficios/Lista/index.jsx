import { useNavigate } from 'react-router-dom'
import { useMemo, useState } from 'react'

import Badge from '../../../../../components/Badge'
import FilterPill from '../../../components/FilterPill'
import Header from '../../../components/Header'
import IconButton from '../../../components/IconButton'
import ListItem from '../../../components/ListItem'
import ScreenLayout from '../../../components/ScreenLayout'
import SearchBar from '../../../../../components/SearchBar'
import { beneficioStatusOptions, beneficios } from '../../../mocks/beneficios'
import { styles } from './styles'

const statusBadge = {
  ativo: { variant: 'ativo', label: 'Ativo' },
  inativo: { variant: 'inativo', label: 'Inativo' },
  pendente: { variant: 'pendente', label: 'Pendente' }
}

const Lista = () => {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('todos')

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase()
    return beneficios.filter((item) => {
      const matchesSearch = !term || item.name.toLowerCase().includes(term) || item.agency.toLowerCase().includes(term)
      const matchesFilter = filter === 'todos' || item.status === filter
      return matchesSearch && matchesFilter
    })
  }, [search, filter])

  return (
    <ScreenLayout header={<Header title="Catálogo de Benefícios" />}>
      <div style={styles.toolbar}>
        <SearchBar value={search} onChange={setSearch} placeholder="Buscar benefício..." />
        <IconButton ariaLabel="Adicionar benefício" onClick={() => navigate('/colaborador/beneficios/novo')} />
      </div>
      <div style={styles.filters}>
        {beneficioStatusOptions.map((option) => (
          <FilterPill
            key={option.value}
            label={option.label}
            count={option.total}
            active={filter === option.value}
            onClick={() => setFilter(option.value)}
          />
        ))}
      </div>
      <div style={styles.countRow}>
        <span style={styles.countLabel}>Todos os benefícios</span>
        <span style={styles.countTotal}>{filtered.length} cadastrados</span>
      </div>
      <div style={styles.list}>
        {filtered.length === 0 && <p style={styles.empty}>Nenhum benefício encontrado.</p>}
        {filtered.map((item) => {
          const badge = statusBadge[item.status]
          return (
            <ListItem
              key={item.id}
              title={item.name}
              subtitle={item.agency}
              badge={<Badge variant={badge.variant}>{badge.label}</Badge>}
              onClick={() => navigate(`/colaborador/beneficios/${item.id}`)}
            />
          )
        })}
      </div>
    </ScreenLayout>
  )
}

export default Lista
