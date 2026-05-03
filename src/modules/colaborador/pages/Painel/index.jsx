import { useNavigate } from 'react-router-dom'

import Header from '../../components/Header'
import MenuItem from '../../components/MenuItem'
import ScreenLayout from '../../components/ScreenLayout'
import SectionTitle from '../../components/SectionTitle'
import StatCard from '../../components/StatCard'
import { beneficios } from '../../mocks/beneficios'
import { colaboradorProfile } from '../../mocks/profile'
import { documentos } from '../../mocks/documentos'
import { requisitos } from '../../mocks/requisitos'
import { unidades } from '../../mocks/unidades'
import { styles } from './styles'

const iconList = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <rect x="1" y="2" width="14" height="2" rx="1" fill="currentColor" />
    <rect x="1" y="7" width="14" height="2" rx="1" fill="currentColor" />
    <rect x="1" y="12" width="14" height="2" rx="1" fill="currentColor" />
  </svg>
)

const iconDocument = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <rect x="3" y="1" width="10" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    <line x1="5.5" y1="5" x2="10.5" y2="5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="5.5" y1="8" x2="10.5" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="5.5" y1="11" x2="9" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

const iconCheck = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3 8.5L6.5 12L13 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const iconPin = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M8 14.5C8 14.5 13 10 13 6.5C13 3.74 10.76 1.5 8 1.5C5.24 1.5 3 3.74 3 6.5C3 10 8 14.5 8 14.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <circle cx="8" cy="6.5" r="2" stroke="currentColor" strokeWidth="1.5" />
  </svg>
)

const countBy = (items, status) => items.filter((item) => item.status === status).length

const Painel = () => {
  const navigate = useNavigate()
  const ativosBeneficios = countBy(beneficios, 'ativo')
  const ativasUnidades = countBy(unidades, 'ativo')

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
        <StatCard value={beneficios.length} label="Benefícios" hint={`${ativosBeneficios} ativos`} />
        <StatCard value={documentos.length} label="Documentos" hint="na biblioteca" />
        <StatCard value={requisitos.length} label="Requisitos" hint="cadastrados" />
        <StatCard value={unidades.length} label="Unidades" hint={`${ativasUnidades} ativas`} />
      </div>

      <SectionTitle>Acesso rápido</SectionTitle>

      <div style={styles.menuList}>
        <MenuItem
          icon={iconList}
          title="Catálogo de Benefícios"
          subtitle="Gerenciar benefícios sociais"
          onClick={() => navigate('/colaborador/beneficios')}
        />
        <MenuItem
          icon={iconDocument}
          title="Biblioteca de Documentos"
          subtitle="Documentos reutilizáveis"
          onClick={() => navigate('/colaborador/documentos')}
        />
        <MenuItem
          icon={iconCheck}
          title="Biblioteca de Requisitos"
          subtitle="Requisitos de elegibilidade"
          onClick={() => navigate('/colaborador/requisitos')}
        />
        <MenuItem
          icon={iconPin}
          title="Unidades de Atendimento"
          subtitle="CRAS, INSS, Defensoria, Prefeitura"
          onClick={() => navigate('/colaborador/unidades')}
        />
      </div>
    </ScreenLayout>
  )
}

export default Painel
