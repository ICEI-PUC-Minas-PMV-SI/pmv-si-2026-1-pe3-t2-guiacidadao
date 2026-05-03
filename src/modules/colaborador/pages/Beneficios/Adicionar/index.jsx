import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

import Button from '../../../../../components/Button'
import ChipList from '../../../components/ChipList'
import Divider from '../../../../../components/Divider'
import Header from '../../../components/Header'
import Input from '../../../../../components/Input'
import ScreenLayout from '../../../components/ScreenLayout'
import TextArea from '../../../../../components/TextArea'
import Toggle from '../../../../../components/Toggle'
import { styles } from './styles'

const Adicionar = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    agency: '',
    description: '',
    requirements: [{ id: 'tmp-1', label: 'Renda per capita ≤ R$218' }],
    documents: [
      { id: 'tmp-rg', label: 'RG' },
      { id: 'tmp-cpf', label: 'CPF' }
    ],
    link: '',
    active: true
  })

  const update = (patch) => setForm((current) => ({ ...current, ...patch }))
  const removeRequirement = (id) => update({ requirements: form.requirements.filter((item) => item.id !== id) })
  const removeDocument = (id) => update({ documents: form.documents.filter((item) => item.id !== id) })

  return (
    <ScreenLayout
      hideNav
      header={<Header title="Adicionar benefício" subtitle="Novo cadastro" />}
    >
      <p style={styles.hint}>* Campos obrigatórios</p>
      <div style={styles.fields}>
        <Input label="Nome do benefício" required value={form.name} onChange={(value) => update({ name: value })} placeholder="Ex: Bolsa Família" />
        <Input label="Órgão responsável" required value={form.agency} onChange={(value) => update({ agency: value })} placeholder="Ex: Governo Federal / MDS" />
        <TextArea label="Descrição resumida" required value={form.description} onChange={(value) => update({ description: value })} placeholder="Em linguagem acessível, explique para quem serve este benefício." />
        <Divider />
        <ChipList
          label="Requisitos de elegibilidade"
          required
          items={form.requirements}
          emptyLabel="Nenhum requisito vinculado."
          onRemove={removeRequirement}
          onAdd={() => navigate('/colaborador/modais/adicionar-requisito')}
        />
        <Divider />
        <ChipList
          label="Documentos necessários"
          items={form.documents}
          emptyLabel="Nenhum documento vinculado."
          onRemove={removeDocument}
          onAdd={() => navigate('/colaborador/modais/adicionar-documento')}
        />
        <Divider />
        <Input label="Link oficial (gov.br)" value={form.link} onChange={(value) => update({ link: value })} placeholder="https://www.gov.br/..." />
        <div style={styles.statusRow}>
          <div style={styles.statusBlock}>
            <span style={styles.statusLabel}>Status inicial</span>
            <span style={styles.statusHint}>Quando ativado, o benefício fica visível para os cidadãos.</span>
          </div>
          <Toggle active={form.active} onChange={(value) => update({ active: value })} />
        </div>
      </div>
      <div style={styles.actions}>
        <Button variant="secondary" style={styles.cancel} onClick={() => navigate('/colaborador/modais/descartar')}>Cancelar</Button>
        <Button style={styles.save} onClick={() => navigate('/colaborador/beneficios')}>Publicar</Button>
      </div>
    </ScreenLayout>
  )
}

export default Adicionar
