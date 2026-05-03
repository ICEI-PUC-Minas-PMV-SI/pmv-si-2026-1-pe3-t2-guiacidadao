import { useNavigate, useParams } from 'react-router-dom'

import Badge from '../../../../../components/Badge'
import Divider from '../../../../../components/Divider'
import Header from '../../../components/Header'
import ScreenLayout from '../../../components/ScreenLayout'
import { beneficios } from '../../../mocks/beneficios'
import { documentos } from '../../../mocks/documentos'
import { requisitos } from '../../../mocks/requisitos'
import { styles } from './styles'

const findById = (collection, id) => collection.find((item) => item.id === id)

const Detalhes = () => {
  const navigate = useNavigate()
  const { beneficioId } = useParams()
  const beneficio = findById(beneficios, beneficioId)

  if (!beneficio) return <p style={{ padding: 24 }}>Benefício não encontrado.</p>

  const reqs = beneficio.requirements.map((id) => findById(requisitos, id)).filter(Boolean)
  const docs = beneficio.documents.map((id) => findById(documentos, id)).filter(Boolean)

  return (
    <ScreenLayout header={<Header title={beneficio.name} />}>
      <div style={styles.topRow}>
        <Badge variant={beneficio.status === 'ativo' ? 'ativo' : beneficio.status}>
          {beneficio.status.charAt(0).toUpperCase() + beneficio.status.slice(1)}
        </Badge>
        <a style={styles.editLink} onClick={() => navigate(`/colaborador/beneficios/${beneficio.id}/editar`)}>
          Editar →
        </a>
      </div>

      <section style={styles.block}>
        <span style={styles.fieldLabel}>Órgão responsável</span>
        <span style={styles.fieldValue}>{beneficio.agency}</span>
      </section>

      <Divider />

      <section style={styles.block}>
        <span style={styles.fieldLabel}>Descrição</span>
        <span style={styles.fieldValue}>{beneficio.description}</span>
      </section>

      <Divider />

      <section style={styles.block}>
        <span style={styles.fieldLabel}>Requisitos de elegibilidade</span>
        <ul style={styles.list}>
          {reqs.map((req) => <li key={req.id}>✓ {req.name}</li>)}
        </ul>
      </section>

      <Divider />

      <section style={styles.block}>
        <span style={styles.fieldLabel}>Documentos necessários</span>
        <ul style={styles.list}>
          {docs.map((doc) => <li key={doc.id}>• {doc.name}</li>)}
        </ul>
      </section>

      <Divider />

      <section style={styles.block}>
        <span style={styles.fieldLabel}>Link oficial</span>
        <a style={styles.link} href={beneficio.officialLink} target="_blank" rel="noreferrer">
          {beneficio.officialLink}
        </a>
      </section>

      <Divider />

      <section style={styles.block}>
        <span style={styles.fieldLabel}>Cadastro</span>
        <span style={styles.fieldValue}>{beneficio.eligibleCount.toLocaleString('pt-BR')} cidadãos elegíveis</span>
        <span style={styles.meta}>Última atualização: {beneficio.updatedAt}</span>
      </section>
    </ScreenLayout>
  )
}

export default Detalhes
