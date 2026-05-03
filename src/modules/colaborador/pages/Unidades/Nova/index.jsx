import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

import Button from '../../../../../components/Button'
import ChipList from '../../../components/ChipList'
import Divider from '../../../../../components/Divider'
import Header from '../../../components/Header'
import Input from '../../../../../components/Input'
import ScreenLayout from '../../../components/ScreenLayout'
import Select from '../../../../../components/Select'
import { unidadeTypes } from '../../../mocks/unidades'
import { styles } from './styles'

const Nova = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    type: '',
    address: '',
    cep: '',
    phone: '',
    schedule: '',
    benefits: [
      { id: 'tmp-bf', label: 'Bolsa Família' },
      { id: 'tmp-bpc', label: 'BPC, LOAS' }
    ]
  })
  const update = (patch) => setForm((current) => ({ ...current, ...patch }))
  const removeBenefit = (id) => update({ benefits: form.benefits.filter((item) => item.id !== id) })

  return (
    <ScreenLayout hideNav header={<Header title="Nova unidade" />}>
      <p style={styles.hint}>* Campos obrigatórios</p>
      <div style={styles.fields}>
        <Input label="Nome da unidade" required value={form.name} onChange={(value) => update({ name: value })} placeholder="Ex: CRAS Centro" />
        <Select label="Tipo" required value={form.type} onChange={(value) => update({ type: value })} options={unidadeTypes} placeholder="Selecione o tipo" />
        <Input label="Endereço completo" required value={form.address} onChange={(value) => update({ address: value })} placeholder="Ex: Rua XV de Novembro, 100" />
        <div style={styles.splitRow}>
          <Input label="CEP" required value={form.cep} onChange={(value) => update({ cep: value })} placeholder="00000-000" />
          <Input label="Telefone" value={form.phone} onChange={(value) => update({ phone: value })} placeholder="(00) 00000-0000" />
        </div>
        <Input label="Horário de funcionamento" required value={form.schedule} onChange={(value) => update({ schedule: value })} placeholder="Ex: Seg a Sex, 08h às 17h" />
        <Divider />
        <section style={styles.benefitsBlock}>
          <span style={styles.benefitsTitle}>Benefícios atendidos</span>
          <span style={styles.benefitsHint}>Selecione os benefícios que esta unidade atende.</span>
          <ChipList
            items={form.benefits}
            emptyLabel="Nenhum benefício vinculado."
            onRemove={removeBenefit}
            onAdd={() => navigate('/colaborador/modais/adicionar-beneficio')}
          />
        </section>
      </div>
      <div style={styles.actions}>
        <Button variant="secondary" style={styles.cancel} onClick={() => navigate('/colaborador/modais/descartar')}>Cancelar</Button>
        <Button style={styles.save} onClick={() => navigate('/colaborador/unidades')}>Salvar</Button>
      </div>
    </ScreenLayout>
  )
}

export default Nova
