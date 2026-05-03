import { useNavigate, useParams } from 'react-router-dom'
import { useMemo, useState } from 'react'

import Button from '../../../../../components/Button'
import ChipList from '../../../components/ChipList'
import Divider from '../../../../../components/Divider'
import Header from '../../../components/Header'
import Input from '../../../../../components/Input'
import ScreenLayout from '../../../components/ScreenLayout'
import TextArea from '../../../../../components/TextArea'
import { beneficios } from '../../../mocks/beneficios'
import { documentos } from '../../../mocks/documentos'
import { requisitos } from '../../../mocks/requisitos'
import { styles } from './styles'

const findById = (collection, id) => collection.find((item) => item.id === id)

const toChips = (ids, source) => ids.map((id) => {
  const found = findById(source, id)
  return found ? { id: found.id, label: found.name } : null
}).filter(Boolean)

const Editar = () => {
  const navigate = useNavigate()
  const { beneficioId } = useParams()
  const beneficio = useMemo(() => findById(beneficios, beneficioId), [beneficioId])

  const [form, setForm] = useState(() => ({
    name: beneficio?.name ?? '',
    agency: beneficio?.agency ?? '',
    description: beneficio?.description ?? '',
    requirements: beneficio ? toChips(beneficio.requirements, requisitos) : [],
    documents: beneficio ? toChips(beneficio.documents, documentos) : [],
    link: beneficio?.officialLink ?? ''
  }))

  if (!beneficio) return <p style={{ padding: 24 }}>Benefício não encontrado.</p>

  const update = (patch) => setForm((current) => ({ ...current, ...patch }))
  const removeRequirement = (id) => update({ requirements: form.requirements.filter((item) => item.id !== id) })
  const removeDocument = (id) => update({ documents: form.documents.filter((item) => item.id !== id) })

  return (
    <ScreenLayout hideNav header={<Header title="Editar benefício" />}>
      <div style={styles.topRow}>
        <span style={styles.editingPill}>Editando: {beneficio.name}</span>
        <span style={styles.hint}>* Campos obrigatórios</span>
      </div>
      <div style={styles.fields}>
        <Input label="Nome do benefício" required value={form.name} onChange={(value) => update({ name: value })} />
        <Input label="Órgão responsável" required value={form.agency} onChange={(value) => update({ agency: value })} />
        <TextArea label="Descrição resumida" required value={form.description} onChange={(value) => update({ description: value })} />
        <Divider />
        <ChipList
          label="Requisitos de elegibilidade"
          required
          items={form.requirements}
          onRemove={removeRequirement}
          onAdd={() => navigate('/colaborador/modais/adicionar-requisito')}
        />
        <Divider />
        <ChipList
          label="Documentos necessários"
          items={form.documents}
          onRemove={removeDocument}
          onAdd={() => navigate('/colaborador/modais/adicionar-documento')}
        />
        <Divider />
        <Input label="Link oficial" value={form.link} onChange={(value) => update({ link: value })} />
      </div>
      <div style={styles.actionsTop}>
        <Button variant="secondary" style={styles.cancel} onClick={() => navigate('/colaborador/modais/descartar')}>Cancelar</Button>
        <Button style={styles.save} onClick={() => navigate(`/colaborador/beneficios/${beneficio.id}`)}>Salvar</Button>
      </div>
      <Button
        variant="dangerOutline"
        style={styles.disable}
        onClick={() => navigate(`/colaborador/beneficios/${beneficio.id}/desativar`)}
      >
        Desativar benefício
      </Button>
    </ScreenLayout>
  )
}

export default Editar
