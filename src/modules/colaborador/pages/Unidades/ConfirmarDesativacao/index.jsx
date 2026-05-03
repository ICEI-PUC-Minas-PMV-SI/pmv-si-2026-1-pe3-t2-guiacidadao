import { useNavigate, useParams } from 'react-router-dom'

import Button from '../../../../../components/Button'
import Header from '../../../components/Header'
import ImpactBox from '../../../../../components/ImpactBox'
import ScreenLayout from '../../../components/ScreenLayout'
import StatusCircle from '../../../../../components/StatusCircle'
import { unidades } from '../../../mocks/unidades'
import { styles } from './styles'

const ConfirmarDesativacao = () => {
  const navigate = useNavigate()
  const { unidadeId } = useParams()
  const unidade = unidades.find((item) => item.id === unidadeId) ?? { name: 'unidade' }

  return (
    <ScreenLayout hideNav header={<Header title="Desativar unidade" />}>
      <section style={styles.body}>
        <StatusCircle variant="warning" />
        <h1 style={styles.title}>Desativar "{unidade.name}"?</h1>
        <ImpactBox
          items={[
            'Não aparecerá mais nas buscas de localização',
            'Atendimentos em andamento serão sinalizados',
            'Cidadãos próximos serão notificados'
          ]}
        />
        <p style={styles.note}>Você poderá reativar a qualquer momento pelo Painel.</p>
      </section>
      <div style={styles.actions}>
        <Button variant="secondary" style={styles.cancel} onClick={() => navigate(-1)}>Cancelar</Button>
        <Button variant="danger" style={styles.confirm} onClick={() => navigate('/colaborador/unidades')}>Desativar</Button>
      </div>
    </ScreenLayout>
  )
}

export default ConfirmarDesativacao
