import { useState } from 'react'

import CidadaoHeader from '../../components/CidadaoHeader'
import { beneficiosCidadao } from '../../mocks/beneficios'
import { styles } from './styles'

const MeusBeneficios = () => {
  const [query, setQuery] = useState('')

  const filtered = beneficiosCidadao.filter((beneficio) =>
    beneficio.nome.toLowerCase().includes(query.trim().toLowerCase())
  )

  return (
    <div style={styles.shell}>
      <CidadaoHeader />
      <main style={styles.body}>
        <h1 style={styles.pageTitle}>Meus Benefícios</h1>

        <section style={styles.card}>
          <input
            style={styles.search}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Pesquisar benefício..."
            aria-label="Pesquisar benefício"
          />

          <div style={styles.tableHead}>
            <span style={styles.th}>Benefício</span>
            <span style={styles.th}>Status</span>
            <span style={styles.th}>Ações</span>
          </div>

          {filtered.length === 0 ? (
            <div style={styles.empty}>Nenhum benefício encontrado.</div>
          ) : (
            filtered.map((beneficio) => (
              <div key={beneficio.id} style={styles.row}>
                <span style={styles.td}>{beneficio.nome}</span>
                <span style={styles.td}>
                  <span style={styles.badge}>{beneficio.status}</span>
                </span>
                <span style={styles.tdAcoes}>
                  <button type="button" style={styles.iconBtn} aria-label="Editar">
                    ✏️
                  </button>
                  <button type="button" style={styles.iconBtn} aria-label="Cancelar">
                    🚫
                  </button>
                </span>
              </div>
            ))
          )}
        </section>

        <button type="button" style={styles.novoBtn}>
          + Novo Benefício
        </button>

        <button type="button" style={styles.salvarBtn}>
          Salvar
        </button>
      </main>
    </div>
  )
}

export default MeusBeneficios
