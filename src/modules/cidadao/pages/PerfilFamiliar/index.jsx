import CidadaoHeader from '../../components/CidadaoHeader'
import { membros, resumoFamiliar } from '../../mocks/familia'
import { styles } from './styles'

const InfoLine = ({ label, value }) => (
  <p style={styles.infoLine}>
    <span style={styles.infoLabel}>{label}:</span> {value}
  </p>
)

const PerfilFamiliar = () => (
  <div style={styles.shell}>
    <CidadaoHeader />
    <main style={styles.body}>
      <h1 style={styles.pageTitle}>Perfil Familiar</h1>

      <section style={styles.resumoCard}>
        <h2 style={styles.cardTitle}>Resumo</h2>
        <InfoLine label="Membros" value={resumoFamiliar.membros} />
        <InfoLine label="Renda Total" value={resumoFamiliar.rendaTotal} />
        <InfoLine label="Renda Per Capita" value={resumoFamiliar.rendaPerCapita} />
      </section>

      <h2 style={styles.sectionTitle}>Membros</h2>

      <div style={styles.membrosBox}>
        {membros.map((membro) => (
          <article key={membro.id} style={styles.memberCard}>
            <h3 style={styles.memberName}>{membro.nome}</h3>
            <InfoLine label="Idade" value={membro.idade} />
            <InfoLine label="Parentesco" value={membro.parentesco} />
            <InfoLine label="Vínculo" value={membro.vinculo} />
            <InfoLine label="Renda Mensal" value={membro.rendaMensal} />
            <button type="button" style={styles.editBtn}>
              Editar
            </button>
          </article>
        ))}
      </div>

      <button type="button" style={styles.addBtn}>
        Adicionar Membro
      </button>
    </main>
  </div>
)

export default PerfilFamiliar
