import { useNavigate } from 'react-router-dom'

import { IconBeneficio, IconDocumento, IconRequisito, IconUnidade } from '../../components/Icons'
import Header from '../../components/Header'
import MenuItem from '../../components/MenuItem'
import ScreenLayout from '../../components/ScreenLayout'
import SectionTitle from '../../components/SectionTitle'
import StatCard from '../../components/StatCard'
import { colaboradorProfile } from '../../mocks/profile'
import { styles } from './styles'

// Valores fixos para corresponder à imagem da documentação (design.md, Tabela 3).
const resumo = {
  beneficios: { total: 17, hint: '12 ativos' },
  documentos: { total: 8, hint: 'na biblioteca' },
  requisitos: { total: 12, hint: 'cadastrados' },
  unidades: { total: 6, hint: '5 ativas' }
}

const Painel = () => {
  const navigate = useNavigate()

  return (
    <ScreenLayout
      header={
        <Header
          hero
          subtitle="Painel do Colaborador"
          initials={colaboradorProfile.initials}
        />
      }
    >
      <section style={styles.introBlock}>
        <h1 style={styles.greeting}>Olá, {colaboradorProfile.fullName.split(' ')[0]}!</h1>
        <p style={styles.subtitle}>Veja um resumo da plataforma</p>
      </section>

      <div style={styles.statsGrid}>
        <StatCard
          value={resumo.beneficios.total}
          label="Benefícios"
          hint={resumo.beneficios.hint}
          onClick={() => navigate('/colaborador/beneficios')}
        />
        <StatCard
          value={resumo.documentos.total}
          label="Documentos"
          hint={resumo.documentos.hint}
          onClick={() => navigate('/colaborador/documentos')}
        />
        <StatCard
          value={resumo.requisitos.total}
          label="Requisitos"
          hint={resumo.requisitos.hint}
          onClick={() => navigate('/colaborador/requisitos')}
        />
        <StatCard
          value={resumo.unidades.total}
          label="Unidades"
          hint={resumo.unidades.hint}
          onClick={() => navigate('/colaborador/unidades')}
        />
      </div>

      <SectionTitle>Acesso rápido</SectionTitle>

      <div style={styles.menuList}>
        <MenuItem
          icon={<IconBeneficio size={18} />}
          title="Catálogo de Benefícios"
          subtitle="Gerenciar benefícios sociais"
          onClick={() => navigate('/colaborador/beneficios')}
        />
        <MenuItem
          icon={<IconDocumento size={18} />}
          title="Biblioteca de Documentos"
          subtitle="Documentos reutilizáveis"
          onClick={() => navigate('/colaborador/documentos')}
        />
        <MenuItem
          icon={<IconRequisito size={18} />}
          title="Biblioteca de Requisitos"
          subtitle="Requisitos de elegibilidade"
          onClick={() => navigate('/colaborador/requisitos')}
        />
        <MenuItem
          icon={<IconUnidade size={18} />}
          title="Unidades de Atendimento"
          subtitle="CRAS, INSS, Defensoria, etc."
          onClick={() => navigate('/colaborador/unidades')}
        />
      </div>
    </ScreenLayout>
  )
}

export default Painel
