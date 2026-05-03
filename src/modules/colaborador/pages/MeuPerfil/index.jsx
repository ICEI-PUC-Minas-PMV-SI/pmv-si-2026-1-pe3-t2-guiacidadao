import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

import Button from '../../../../components/Button'
import Header from '../../components/Header'
import Input from '../../../../components/Input'
import ScreenLayout from '../../components/ScreenLayout'
import { colaboradorProfile } from '../../mocks/profile'
import { styles } from './styles'

const MeuPerfil = () => {
  const navigate = useNavigate()
  const [name, setName] = useState(colaboradorProfile.fullName)
  const [email, setEmail] = useState(colaboradorProfile.email)
  const [phone, setPhone] = useState(colaboradorProfile.phone)

  return (
    <ScreenLayout header={<Header title="Meu perfil" />}>
      <section style={styles.identity}>
        <div style={styles.avatar}>{colaboradorProfile.initials}</div>
        <h1 style={styles.name}>{colaboradorProfile.fullName}</h1>
        <span style={styles.role}>{colaboradorProfile.role}</span>
      </section>
      <div style={styles.fields}>
        <Input label="Nome completo" required value={name} onChange={setName} />
        <Input label="E-mail institucional" required value={email} onChange={setEmail} />
        <Input label="Telefone" value={phone} onChange={setPhone} placeholder="(00) 00000-0000" />
      </div>
      <Button variant="secondary" style={styles.passwordBtn} onClick={() => navigate('/colaborador/alterar-senha')}>
        Alterar senha
      </Button>
      <div style={styles.actions}>
        <Button variant="secondary" style={styles.cancel} onClick={() => navigate(-1)}>Cancelar</Button>
        <Button style={styles.save} onClick={() => navigate(-1)}>Salvar</Button>
      </div>
      <Button variant="dangerOutline" style={styles.exitBtn} onClick={() => navigate('/colaborador/login')}>
        Sair da conta
      </Button>
    </ScreenLayout>
  )
}

export default MeuPerfil
