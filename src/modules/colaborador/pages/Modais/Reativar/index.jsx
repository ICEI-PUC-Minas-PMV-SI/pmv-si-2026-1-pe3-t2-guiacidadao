import { useNavigate, useSearchParams } from 'react-router-dom'

import Button from '../../../../../components/Button'
import Header from '../../../components/Header'
import ImpactBox from '../../../../../components/ImpactBox'
import ScreenLayout from '../../../components/ScreenLayout'
import StatusCircle from '../../../../../components/StatusCircle'
import { styles } from './styles'

const Reativar = () => {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const itemName = params.get('nome') ?? 'Vale-Gás Nacional'

  return (
    <ScreenLayout hideNav header={<Header title="Reativar item" />}>
      <section style={styles.body}>
        <StatusCircle variant="success" />
        <h1 style={styles.title}>Reativar "{itemName}"?</h1>
        <ImpactBox
          title="O que muda"
          items={[
            'Voltará a aparecer nas buscas',
            'Cidadãos elegíveis serão notificados'
          ]}
        />
        <p style={styles.note}>Você poderá desativar novamente a qualquer momento.</p>
      </section>
      <div style={styles.actions}>
        <Button variant="secondary" style={styles.cancel} onClick={() => navigate(-1)}>Cancelar</Button>
        <Button style={styles.confirm} onClick={() => navigate(-1)}>Reativar</Button>
      </div>
    </ScreenLayout>
  )
}

export default Reativar
