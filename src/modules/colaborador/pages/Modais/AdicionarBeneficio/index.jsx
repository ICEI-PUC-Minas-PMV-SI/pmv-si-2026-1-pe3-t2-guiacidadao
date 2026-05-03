import { useNavigate } from 'react-router-dom'
import { useMemo, useState } from 'react'

import Button from '../../../../../components/Button'
import SearchBar from '../../../../../components/SearchBar'
import { beneficios } from '../../../mocks/beneficios'
import { styles } from '../AdicionarRequisito/styles'

const tabs = [
  { value: 'biblioteca', label: 'Da biblioteca' },
  { value: 'criar', label: 'Criar novo' }
]

const AdicionarBeneficio = () => {
  const navigate = useNavigate()
  const [tab, setTab] = useState('biblioteca')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState({})

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase()
    return beneficios.filter((item) => !term || item.name.toLowerCase().includes(term))
  }, [search])

  const toggle = (id) => setSelected((current) => ({ ...current, [id]: !current[id] }))
  const totalSelected = Object.values(selected).filter(Boolean).length

  return (
    <main style={styles.shell}>
      <section style={styles.sheet}>
        <span style={styles.grabber} />
        <header style={styles.headerRow}>
          <h2 style={styles.title}>Vincular benefício</h2>
          <button type="button" onClick={() => navigate(-1)} style={styles.close}>×</button>
        </header>
        <nav style={styles.tabs}>
          {tabs.map((option) => (
            <button
              key={option.value}
              type="button"
              style={styles.tab(tab === option.value)}
              onClick={() => setTab(option.value)}
            >
              {option.label}
            </button>
          ))}
        </nav>
        {tab === 'biblioteca' ? (
          <>
            <div style={styles.search}>
              <SearchBar value={search} onChange={setSearch} placeholder="Buscar benefício..." />
            </div>
            <div style={styles.list}>
              {filtered.map((item) => {
                const checked = !!selected[item.id]
                return (
                  <button key={item.id} type="button" style={styles.row(checked)} onClick={() => toggle(item.id)}>
                    <span style={styles.check(checked)}>{checked ? '✓' : ''}</span>
                    <span style={styles.rowText}>{item.name}</span>
                  </button>
                )
              })}
            </div>
            <div style={styles.footer}>
              <Button onClick={() => navigate(-1)} disabled={totalSelected === 0}>
                Adicionar selecionados ({totalSelected})
              </Button>
            </div>
          </>
        ) : (
          <div style={styles.footer}>
            <Button onClick={() => navigate('/colaborador/beneficios/novo')}>Cadastrar novo benefício</Button>
          </div>
        )}
      </section>
    </main>
  )
}

export default AdicionarBeneficio
