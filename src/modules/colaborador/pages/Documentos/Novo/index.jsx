import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

import Button from '../../../../../components/Button'
import Divider from '../../../../../components/Divider'
import Header from '../../../components/Header'
import Input from '../../../../../components/Input'
import ScreenLayout from '../../../components/ScreenLayout'
import Select from '../../../../../components/Select'
import TextArea from '../../../../../components/TextArea'
import Toggle from '../../../../../components/Toggle'
import { documentoCategories } from '../../../mocks/documentos'
import { styles } from './styles'

const Novo = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    category: '',
    guidance: '',
    optional: false
  })
  const update = (patch) => setForm((current) => ({ ...current, ...patch }))

  return (
    <ScreenLayout hideNav header={<Header title="Novo documento" />}>
      <p style={styles.hint}>* Campos obrigatórios</p>
      <div style={styles.fields}>
        <Input label="Nome do documento" required value={form.name} onChange={(value) => update({ name: value })} placeholder="Ex: RG" />
        <Select
          label="Categoria"
          required
          value={form.category}
          onChange={(value) => update({ category: value })}
          options={documentoCategories}
          placeholder="Selecione uma categoria"
        />
        <TextArea
          label="Orientação de obtenção"
          required
          value={form.guidance}
          onChange={(value) => update({ guidance: value })}
          placeholder="Explique em linguagem simples como o cidadão consegue este documento."
        />
        <Divider />
        <div style={styles.togglerRow}>
          <div style={styles.togglerBlock}>
            <span style={styles.togglerTitle}>Pode ser marcado como "não aplicável"?</span>
            <span style={styles.togglerHint}>O cidadão pode indicar que o item não se aplica ao seu caso.</span>
          </div>
          <Toggle active={form.optional} onChange={(value) => update({ optional: value })} />
        </div>
      </div>
      <div style={styles.actions}>
        <Button variant="secondary" style={styles.cancel} onClick={() => navigate('/colaborador/modais/descartar')}>Cancelar</Button>
        <Button style={styles.save} onClick={() => navigate('/colaborador/documentos')}>Salvar</Button>
      </div>
    </ScreenLayout>
  )
}

export default Novo
