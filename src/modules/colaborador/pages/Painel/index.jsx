import { useNavigate } from 'react-router-dom'

import { IconBeneficio, IconDocumento, IconRequisito, IconUnidade } from '../../components/Icons'
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
        <StatCard
          value={beneficios.length}
          label="Benefícios"
          hint={`${ativosBeneficios} ativos`}
          onClick={() => navigate('/colaborador/beneficios')}
        />
        <StatCard
          value={documentos.length}
          label="Documentos"
          hint="na biblioteca"
          onClick={() => navigate('/colaborador/documentos')}
        />
        <StatCard
          value={requisitos.length}
          label="Requisitos"
          hint="cadastrados"
          onClick={() => navigate('/colaborador/requisitos')}
        />
        <StatCard
          value={unidades.length}
          label="Unidades"
          hint={`${ativasUnidades} ativas`}
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
          subtitle="CRAS, INSS, Defensoria, Prefeitura"
          onClick={() => navigate('/colaborador/unidades')}
        />
      </div>
    </ScreenLayout>
  )
}

export default Painel
