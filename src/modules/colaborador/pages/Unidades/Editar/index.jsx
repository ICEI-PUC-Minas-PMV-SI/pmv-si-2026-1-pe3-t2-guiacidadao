import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'

import Button from '../../../../../components/Button'
import Header from '../../../components/Header'
import Input from '../../../../../components/Input'
import ScreenLayout from '../../../components/ScreenLayout'
import Select from '../../../../../components/Select'
import { unidadeTypes, unidades } from '../../../mocks/unidades'
import { styles } from './styles'

const Editar = () => {
  const navigate = useNavigate()
  const { unidadeId } = useParams()
  const unidade = unidades.find((item) => item.id === unidadeId)

  const [form, setForm] = useState(() => ({
    name: unidade?.name ?? '',
    type: unidade?.type ?? '',
    address: unidade?.address ?? '',
    cep: unidade?.cep ?? '',
    phone: unidade?.phone ?? '',
    schedule: unidade?.schedule ?? ''
  }))

  if (!unidade) return <p style={{ padding: 24 }}>Unidade não encontrada.</p>

  const update = (patch) => setForm((current) => ({ ...current, ...patch }))

  return (
    <ScreenLayout hideNav header={<Header title="Editar unidade" />}>
      <p style={styles.hint}>* Campos obrigatórios</p>
      <div style={styles.fields}>
        <Input label="Nome da unidade" required value={form.name} onChange={(value) => update({ name: value })} />
        <Select label="Tipo" required value={form.type} onChange={(value) => update({ type: value })} options={unidadeTypes} />
        <Input label="Endereço completo" required value={form.address} onChange={(value) => update({ address: value })} />
        <div style={styles.splitRow}>
          <Input label="CEP" required value={form.cep} onChange={(value) => update({ cep: value })} />
          <Input label="Telefone" value={form.phone} onChange={(value) => update({ phone: value })} />
        </div>
        <Input label="Horário de funcionamento" required value={form.schedule} onChange={(value) => update({ schedule: value })} />
      </div>
      <div style={styles.actionsTop}>
        <Button variant="secondary" style={styles.cancel} onClick={() => navigate('/colaborador/modais/descartar')}>Cancelar</Button>
        <Button style={styles.save} onClick={() => navigate('/colaborador/unidades')}>Salvar alterações</Button>
      </div>
      <Button
        variant="dangerOutline"
        style={styles.disable}
        onClick={() => navigate(`/colaborador/unidades/${unidade.id}/desativar`)}
      >
        Desativar unidade
      </Button>
    </ScreenLayout>
  )
}

export default Editar
