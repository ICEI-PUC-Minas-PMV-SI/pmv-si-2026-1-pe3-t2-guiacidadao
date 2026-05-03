import { useNavigate } from 'react-router-dom'

import Button from '../../../../../components/Button'
import Header from '../../../components/Header'
import ImpactBox from '../../../../../components/ImpactBox'
import ScreenLayout from '../../../components/ScreenLayout'
import StatusCircle from '../../../../../components/StatusCircle'
import { styles } from './styles'

const Descartar = () => {
  const navigate = useNavigate()
  return (
    <ScreenLayout hideNav header={<Header title="Descartar alterações" />}>
      <section style={styles.body}>
        <StatusCircle variant="warning" />
        <h1 style={styles.title}>Tem certeza?</h1>
        <p style={styles.message}>Você tem alterações não salvas.</p>
        <ImpactBox
          title="O que será perdido"
          items={[
            'Campos preenchidos do formulário',
            'Requisitos e documentos selecionados'
          ]}
        />
        <p style={styles.note}>Se sair agora, suas alterações serão perdidas.</p>
      </section>
      <div style={styles.actions}>
        <Button variant="secondary" style={styles.cancel} onClick={() => navigate(-1)}>Cancelar</Button>
        <Button variant="danger" style={styles.confirm} onClick={() => navigate('/colaborador/painel')}>Confirmar</Button>
      </div>
    </ScreenLayout>
  )
}

export default Descartar
