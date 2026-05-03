import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

import Button from '../../../../components/Button'
import Input from '../../../../components/Input'
import { styles } from './styles'

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    navigate('/colaborador/painel')
  }

  return (
    <main style={styles.shell}>
      <header style={styles.hero}>
        <span style={styles.bubbleA} />
        <span style={styles.bubbleB} />
        <h1 style={styles.brand}>GuiaCidadão</h1>
        <p style={styles.heroSub}>Acesso institucional</p>
      </header>
      <form style={styles.card} onSubmit={handleSubmit}>
        <h2 style={styles.title}>Entrar na conta</h2>
        <Input
          name="email"
          type="email"
          label="E-mail institucional"
          value={email}
          onChange={setEmail}
          placeholder="nome@org.gov.br"
        />
        <Input
          name="password"
          type="password"
          label="Senha"
          value={password}
          onChange={setPassword}
          placeholder="••••••••"
          helperLabel="Esqueci minha senha"
          onHelperClick={() => navigate('/colaborador/recuperar-senha')}
        />
        <Button type="submit">Entrar</Button>
      </form>
      <a style={styles.back} onClick={() => navigate('/cidadao')}>← Sou cidadão</a>
    </main>
  )
}

export default Login
