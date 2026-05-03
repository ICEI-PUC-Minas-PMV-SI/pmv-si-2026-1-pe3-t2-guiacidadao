import { useNavigate, useParams } from 'react-router-dom'

import Button from '../../../../../components/Button'
import Header from '../../../components/Header'
import ImpactBox from '../../../../../components/ImpactBox'
import ScreenLayout from '../../../components/ScreenLayout'
import StatusCircle from '../../../../../components/StatusCircle'
import { beneficios } from '../../../mocks/beneficios'
import { styles } from './styles'

const findById = (collection, id) => collection.find((item) => item.id === id)

const ConfirmarDesativacao = () => {
  const navigate = useNavigate()
  const { beneficioId } = useParams()
  const beneficio = findById(beneficios, beneficioId) ?? { name: 'benefício', eligibleCount: 0 }

  return (
    <ScreenLayout hideNav header={<Header title="Desativar benefício" />}>
      <section style={styles.body}>
        <StatusCircle variant="warning" />
        <h1 style={styles.title}>Desativar "{beneficio.name}"?</h1>
        <ImpactBox
          title="O que muda"
          items={[
            'Não aparecerá mais nas buscas dos cidadãos',
            `${beneficio.eligibleCount.toLocaleString('pt-BR')} cidadãos elegíveis serão notificados`,
            'Atendimentos em andamento serão sinalizados'
          ]}
        />
        <p style={styles.note}>Você poderá reativar a qualquer momento pelo Painel.</p>
      </section>
      <div style={styles.actions}>
        <Button variant="secondary" style={styles.cancel} onClick={() => navigate(-1)}>Cancelar</Button>
        <Button variant="danger" style={styles.confirm} onClick={() => navigate('/colaborador/beneficios')}>
          Confirmar
        </Button>
      </div>
    </ScreenLayout>
  )
}

export default ConfirmarDesativacao
