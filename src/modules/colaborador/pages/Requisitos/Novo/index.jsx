import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

import Button from '../../../../../components/Button'
import Divider from '../../../../../components/Divider'
import Header from '../../../components/Header'
import Input from '../../../../../components/Input'
import ScreenLayout from '../../../components/ScreenLayout'
import Select from '../../../../../components/Select'
import TextArea from '../../../../../components/TextArea'
import { operadores, requisitoCategories } from '../../../mocks/requisitos'
import { styles } from './styles'

const Novo = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    category: '',
    description: '',
    value: '',
    operator: 'lte'
  })
  const update = (patch) => setForm((current) => ({ ...current, ...patch }))

  return (
    <ScreenLayout hideNav header={<Header title="Novo requisito" />}>
      <p style={styles.hint}>* Campos obrigatórios</p>
      <div style={styles.fields}>
        <Input label="Nome do requisito" required value={form.name} onChange={(value) => update({ name: value })} placeholder="Ex: Renda per capita ≤ R$ 218" />
        <Select label="Categoria" required value={form.category} onChange={(value) => update({ category: value })} options={requisitoCategories} placeholder="Selecione uma categoria" />
        <TextArea label="Descrição em linguagem simples" required value={form.description} onChange={(value) => update({ description: value })} placeholder="Explique este requisito em palavras claras para o cidadão." />
        <Divider />
        <section style={styles.paramBlock}>
          <span style={styles.paramTitle}>Parâmetro de avaliação</span>
          <span style={styles.paramHint}>Valor numérico usado pelo sistema para calcular a elegibilidade automaticamente.</span>
          <div style={styles.paramRow}>
            <Input value={form.value} onChange={(value) => update({ value })} placeholder="Ex: 218.00" />
            <Select value={form.operator} onChange={(value) => update({ operator: value })} options={operadores} />
          </div>
        </section>
      </div>
      <div style={styles.actions}>
        <Button variant="secondary" style={styles.cancel} onClick={() => navigate('/colaborador/modais/descartar')}>Cancelar</Button>
        <Button style={styles.save} onClick={() => navigate('/colaborador/requisitos')}>Salvar</Button>
      </div>
    </ScreenLayout>
  )
}

export default Novo
