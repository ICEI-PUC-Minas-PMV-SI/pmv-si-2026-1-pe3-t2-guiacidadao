import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'

import Button from '../../../../../components/Button'
import Divider from '../../../../../components/Divider'
import Header from '../../../components/Header'
import Input from '../../../../../components/Input'
import ScreenLayout from '../../../components/ScreenLayout'
import Select from '../../../../../components/Select'
import TextArea from '../../../../../components/TextArea'
import Toggle from '../../../../../components/Toggle'
import { documentoCategories, documentos } from '../../../mocks/documentos'
import { styles } from './styles'

const Editar = () => {
  const navigate = useNavigate()
  const { documentoId } = useParams()
  const documento = documentos.find((item) => item.id === documentoId)

  const [form, setForm] = useState(() => ({
    name: documento?.name ?? '',
    category: documento?.category ?? '',
    guidance: documento?.guidance ?? '',
    optional: documento?.optional ?? false
  }))

  if (!documento) return <p style={{ padding: 24 }}>Documento não encontrado.</p>

  const update = (patch) => setForm((current) => ({ ...current, ...patch }))

  return (
    <ScreenLayout hideNav header={<Header title="Editar documento" />}>
      <p style={styles.hint}>* Campos obrigatórios</p>
      <div style={styles.fields}>
        <Input label="Nome do documento" required value={form.name} onChange={(value) => update({ name: value })} />
        <Select
          label="Categoria"
          required
          value={form.category}
          onChange={(value) => update({ category: value })}
          options={documentoCategories}
        />
        <TextArea label="Orientação de obtenção" required value={form.guidance} onChange={(value) => update({ guidance: value })} />
        <Divider />
        <div style={styles.togglerRow}>
          <div style={styles.togglerBlock}>
            <span style={styles.togglerTitle}>Pode ser marcado como "não aplicável"?</span>
            <span style={styles.togglerHint}>O cidadão pode indicar que o item não se aplica ao seu caso.</span>
          </div>
          <Toggle active={form.optional} onChange={(value) => update({ optional: value })} />
        </div>
      </div>
      <div style={styles.actionsTop}>
        <Button variant="secondary" style={styles.cancel} onClick={() => navigate('/colaborador/modais/descartar')}>Cancelar</Button>
        <Button style={styles.save} onClick={() => navigate('/colaborador/documentos')}>Salvar alterações</Button>
      </div>
      <Button
        variant="dangerOutline"
        style={styles.disable}
        onClick={() => navigate(`/colaborador/documentos/${documento.id}/desativar`)}
      >
        Desativar documento
      </Button>
    </ScreenLayout>
  )
}

export default Editar
