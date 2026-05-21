import { useNavigate } from 'react-router-dom'

import logo from '../../../../assets/icons/Logo.png'
import { styles } from './styles'

const CidadaoHeader = ({ onBack }) => {
  const navigate = useNavigate()
  const handleBack = onBack ?? (() => navigate(-1))

  return (
    <header style={styles.bar}>
      <button type="button" onClick={handleBack} style={styles.back} aria-label="Voltar">
        ←
      </button>
      <div style={styles.brand}>
        <img src={logo} alt="" style={styles.logo} />
        <span style={styles.brandText}>GuiaCidadão</span>
      </div>
      <span style={styles.spacer} aria-hidden />
    </header>
  )
}

export default CidadaoHeader
