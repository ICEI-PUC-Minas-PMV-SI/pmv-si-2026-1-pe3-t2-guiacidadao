import { useNavigate, useParams } from 'react-router-dom'

import Button from '../../../../../components/Button'
import Header from '../../../components/Header'
import ImpactBox from '../../../../../components/ImpactBox'
import ScreenLayout from '../../../components/ScreenLayout'
import StatusCircle from '../../../../../components/StatusCircle'
import { documentos } from '../../../mocks/documentos'
import { styles } from './styles'

const ConfirmarDesativacao = () => {
  const navigate = useNavigate()
  const { documentoId } = useParams()
  const documento = documentos.find((item) => item.id === documentoId) ?? { name: 'documento' }

  return (
    <ScreenLayout hideNav header={<Header title="Desativar documento" />}>
      <section style={styles.body}>
        <StatusCircle variant="warning" />
        <h1 style={styles.title}>Desativar "{documento.name}"?</h1>
        <ImpactBox
          items={[
            'O documento sairá das listas de cadastros novos',
            'Cidadãos com checklist em andamento serão notificados',
            'Benefícios que dependem dele serão sinalizados'
          ]}
        />
        <p style={styles.note}>Você poderá reativar a qualquer momento pelo Painel.</p>
      </section>
      <div style={styles.actions}>
        <Button variant="secondary" style={styles.cancel} onClick={() => navigate(-1)}>Cancelar</Button>
        <Button variant="danger" style={styles.confirm} onClick={() => navigate('/colaborador/documentos')}>
          Desativar
        </Button>
      </div>
    </ScreenLayout>
  )
}

export default ConfirmarDesativacao
