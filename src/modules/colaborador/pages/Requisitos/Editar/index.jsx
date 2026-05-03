import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'

import Button from '../../../../../components/Button'
import Divider from '../../../../../components/Divider'
import Header from '../../../components/Header'
import Input from '../../../../../components/Input'
import ScreenLayout from '../../../components/ScreenLayout'
import Select from '../../../../../components/Select'
import TextArea from '../../../../../components/TextArea'
import { operadores, requisitoCategories, requisitos } from '../../../mocks/requisitos'
import { styles } from './styles'

const Editar = () => {
  const navigate = useNavigate()
  const { requisitoId } = useParams()
  const requisito = requisitos.find((item) => item.id === requisitoId)

  const [form, setForm] = useState(() => ({
    name: requisito?.name ?? '',
    category: requisito?.category ?? '',
    description: requisito?.description ?? '',
    value: requisito?.value ?? '',
    operator: requisito?.operator ?? 'lte'
  }))

  if (!requisito) return <p style={{ padding: 24 }}>Requisito não encontrado.</p>

  const update = (patch) => setForm((current) => ({ ...current, ...patch }))

  return (
    <ScreenLayout hideNav header={<Header title="Editar requisito" />}>
      <p style={styles.hint}>* Campos obrigatórios</p>
      <div style={styles.fields}>
        <Input label="Nome do requisito" required value={form.name} onChange={(value) => update({ name: value })} />
        <Select label="Categoria" required value={form.category} onChange={(value) => update({ category: value })} options={requisitoCategories} />
        <TextArea label="Descrição em linguagem simples" required value={form.description} onChange={(value) => update({ description: value })} />
        <Divider />
        <section style={styles.paramBlock}>
          <span style={styles.paramTitle}>Parâmetro de avaliação</span>
          <div style={styles.paramRow}>
            <Input value={form.value} onChange={(value) => update({ value })} />
            <Select value={form.operator} onChange={(value) => update({ operator: value })} options={operadores} />
          </div>
        </section>
      </div>
      <div style={styles.actionsTop}>
        <Button variant="secondary" style={styles.cancel} onClick={() => navigate('/colaborador/modais/descartar')}>Cancelar</Button>
        <Button style={styles.save} onClick={() => navigate('/colaborador/requisitos')}>Salvar alterações</Button>
      </div>
      <Button
        variant="dangerOutline"
        style={styles.disable}
        onClick={() => navigate(`/colaborador/requisitos/${requisito.id}/desativar`)}
      >
        Desativar requisito
      </Button>
    </ScreenLayout>
  )
}

export default Editar
