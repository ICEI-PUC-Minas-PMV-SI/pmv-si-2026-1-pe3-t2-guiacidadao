import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

import Button from '../../../../components/Button'
import Header from '../../components/Header'
import Input from '../../../../components/Input'
import ScreenLayout from '../../components/ScreenLayout'
import { styles } from './styles'

const PrimeiroAcesso = () => {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')

  return (
    <ScreenLayout hideNav header={<Header title="Primeiro acesso" />}>
      <section style={styles.intro}>
        <h1 style={styles.greeting}>Bem-vindo(a)!</h1>
        <p style={styles.message}>
          Sua senha provisória precisa ser substituída por uma nova antes de continuar.
        </p>
      </section>
      <Input
        type="password"
        label="Nova senha"
        required
        value={password}
        onChange={setPassword}
        placeholder="Digite sua nova senha"
      />
      <Input
        type="password"
        label="Confirmar nova senha"
        required
        value={confirm}
        onChange={setConfirm}
        placeholder="Repita a nova senha"
      />
      <ul style={styles.rules}>
        <li style={styles.rulesTitle}>Sua senha deve ter:</li>
        <li>• Mínimo 8 caracteres</li>
        <li>• 1 letra maiúscula e 1 número</li>
        <li>• 1 caractere especial (!@#$...)</li>
      </ul>
      <div style={styles.actions}>
        <Button onClick={() => navigate('/colaborador/painel')}>Definir senha</Button>
      </div>
    </ScreenLayout>
  )
}

export default PrimeiroAcesso
