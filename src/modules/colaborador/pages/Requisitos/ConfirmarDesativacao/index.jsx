import { useNavigate, useParams } from 'react-router-dom'

import Button from '../../../../../components/Button'
import Header from '../../../components/Header'
import ImpactBox from '../../../../../components/ImpactBox'
import ScreenLayout from '../../../components/ScreenLayout'
import StatusCircle from '../../../../../components/StatusCircle'
import { requisitos } from '../../../mocks/requisitos'
import { styles } from './styles'

const ConfirmarDesativacao = () => {
  const navigate = useNavigate()
  const { requisitoId } = useParams()
  const requisito = requisitos.find((item) => item.id === requisitoId) ?? { name: 'requisito', benefitsLinked: 0 }

  return (
    <ScreenLayout hideNav header={<Header title="Desativar requisito" />}>
      <section style={styles.body}>
        <StatusCircle variant="warning" />
        <h1 style={styles.title}>Desativar "{requisito.name}"?</h1>
        <ImpactBox
          items={[
            'Não será mais usado em avaliações de elegibilidade',
            `${requisito.benefitsLinked} benefícios serão reavaliados automaticamente`,
            'Usuários afetados serão notificados'
          ]}
        />
        <p style={styles.note}>Você poderá reativar a qualquer momento pelo Painel.</p>
      </section>
      <div style={styles.actions}>
        <Button variant="secondary" style={styles.cancel} onClick={() => navigate(-1)}>Cancelar</Button>
        <Button variant="danger" style={styles.confirm} onClick={() => navigate('/colaborador/requisitos')}>Desativar</Button>
      </div>
    </ScreenLayout>
  )
}

export default ConfirmarDesativacao
