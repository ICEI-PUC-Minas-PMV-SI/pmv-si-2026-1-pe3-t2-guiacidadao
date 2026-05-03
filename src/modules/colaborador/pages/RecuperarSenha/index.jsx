import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

import Button from '../../../../components/Button'
import Header from '../../components/Header'
import Input from '../../../../components/Input'
import ScreenLayout from '../../components/ScreenLayout'
import { styles } from './styles'

const RecuperarSenha = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')

  return (
    <ScreenLayout hideNav header={<Header title="Recuperar senha" />}>
      <section style={styles.intro}>
        <h1 style={styles.title}>Informe o e-mail cadastrado</h1>
        <p style={styles.message}>
          Enviaremos um código de verificação para você redefinir sua senha.
        </p>
      </section>
      <Input
        type="email"
        label="E-mail institucional"
        required
        value={email}
        onChange={setEmail}
        placeholder="nome@org.gov.br"
      />
      <div style={styles.actions}>
        <Button variant="secondary" style={styles.cancelBtn} onClick={() => navigate(-1)}>
          Cancelar
        </Button>
        <Button style={styles.primaryBtn} onClick={() => navigate('/colaborador/login')}>
          Enviar código
        </Button>
      </div>
    </ScreenLayout>
  )
}

export default RecuperarSenha
