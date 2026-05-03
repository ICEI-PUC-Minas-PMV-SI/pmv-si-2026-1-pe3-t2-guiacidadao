import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

import Button from '../../../../components/Button'
import Header from '../../components/Header'
import Input from '../../../../components/Input'
import ScreenLayout from '../../components/ScreenLayout'
import { styles } from './styles'

const AlterarSenha = () => {
  const navigate = useNavigate()
  const [current, setCurrent] = useState('')
  const [next, setNext] = useState('')
  const [confirm, setConfirm] = useState('')

  return (
    <ScreenLayout header={<Header title="Alterar senha" />}>
      <div style={styles.fields}>
        <Input type="password" label="Senha atual" required value={current} onChange={setCurrent} />
        <Input type="password" label="Nova senha" required value={next} onChange={setNext} />
        <Input type="password" label="Confirmar nova senha" required value={confirm} onChange={setConfirm} />
      </div>
      <ul style={styles.rules}>
        <li style={styles.rulesTitle}>Sua senha deve ter:</li>
        <li>• Mínimo 8 caracteres</li>
        <li>• 1 letra maiúscula e 1 número</li>
        <li>• 1 caractere especial</li>
      </ul>
      <div style={styles.actions}>
        <Button variant="secondary" style={styles.cancel} onClick={() => navigate(-1)}>Cancelar</Button>
        <Button style={styles.save} onClick={() => navigate(-1)}>Salvar</Button>
      </div>
    </ScreenLayout>
  )
}

export default AlterarSenha
