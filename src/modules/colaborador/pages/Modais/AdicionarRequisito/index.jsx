import { useNavigate } from 'react-router-dom'
import { useMemo, useState } from 'react'

import Button from '../../../../../components/Button'
import SearchBar from '../../../../../components/SearchBar'
import { requisitos } from '../../../mocks/requisitos'
import { styles } from './styles'

const tabs = [
  { value: 'biblioteca', label: 'Da biblioteca' },
  { value: 'criar', label: 'Criar novo' }
]

const AdicionarRequisito = () => {
  const navigate = useNavigate()
  const [tab, setTab] = useState('biblioteca')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState({})

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase()
    return requisitos.filter((req) => !term || req.name.toLowerCase().includes(term))
  }, [search])

  const toggle = (id) => setSelected((current) => ({ ...current, [id]: !current[id] }))
  const totalSelected = Object.values(selected).filter(Boolean).length

  return (
    <main style={styles.shell}>
      <section style={styles.sheet}>
        <span style={styles.grabber} />
        <header style={styles.headerRow}>
          <h2 style={styles.title}>Adicionar requisito</h2>
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
              <SearchBar value={search} onChange={setSearch} placeholder="Buscar requisito..." />
            </div>
            <div style={styles.list}>
              {filtered.map((req) => {
                const checked = !!selected[req.id]
                return (
                  <button key={req.id} type="button" style={styles.row(checked)} onClick={() => toggle(req.id)}>
                    <span style={styles.check(checked)}>{checked ? '✓' : ''}</span>
                    <span style={styles.rowText}>{req.name}</span>
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
            <Button onClick={() => navigate('/colaborador/requisitos/novo')}>Cadastrar novo requisito</Button>
          </div>
        )}
      </section>
    </main>
  )
}

export default AdicionarRequisito
