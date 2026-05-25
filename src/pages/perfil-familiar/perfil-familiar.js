// ===== PERFIL FAMILIAR =====

// Dados da família
let familiaData = {
    membros: []
};

/**
 * Carrega dados da família do localStorage
 */
function carregarDadosFamilia() {
    try {
        const usuarioLogado = localStorage.getItem('usuarioLogado');

        if (!usuarioLogado) {
            console.warn('Nenhum usuário logado');
            mostrarEstadoVazio();
            return;
        }

        const usuario = JSON.parse(usuarioLogado);
        const usuarioId = usuario.id || usuario.cpf;

        const familiaLocalStorage = localStorage.getItem(`familia_${usuarioId}`);

        if (familiaLocalStorage) {
            familiaData = JSON.parse(familiaLocalStorage);
        } else {
            familiaData = { membros: [] };
            localStorage.setItem(`familia_${usuarioId}`, JSON.stringify(familiaData));
        }

        renderizarDados();
    } catch (error) {
        console.error('Erro ao carregar dados da família:', error);
        mostrarEstadoVazio();
    }
}

/**
 * Formata valor para moeda brasileira
 */
function formatarMoeda(valor) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(valor);
}

/**
 * Calcula e atualiza o resumo familiar
 */
function atualizarResumo() {
    const membros = familiaData.membros;
    const totalMembros = membros.length;
    const rendaTotal = membros.reduce((sum, m) => sum + (m.rendaMensal || 0), 0);
    const rendaPerCapita = totalMembros > 0 ? rendaTotal / totalMembros : 0;

    document.getElementById('total-membros').textContent = totalMembros;
    document.getElementById('renda-total').textContent = formatarMoeda(rendaTotal);
    document.getElementById('renda-per-capita').textContent = formatarMoeda(rendaPerCapita);
}

/**
 * Renderiza os membros da família como cards
 */
function renderizarMembros() {
    const container = document.getElementById('members-container');
    const membros = familiaData.membros;

    if (membros.length === 0) {
        container.innerHTML = `
      <div style="text-align: center; padding: 40px 20px; color: var(--text-muted);">
        <div style="font-family: var(--font-body); font-size: 14px; line-height: 1.5;">
          Nenhum membro cadastrado na sua família
        </div>
      </div>
    `;
        return;
    }

    container.innerHTML = membros.map(membro => `
    <div class="benefit-card card-blue" style="margin-bottom: 12px;">
      <h3>${membro.nome}</h3>
      <p><strong>Idade:</strong> ${membro.idade} anos</p>
      <p><strong>Parentesco:</strong> ${membro.parentesco}</p>
      <p><strong>Vínculo:</strong> ${membro.vinculo}</p>
      <p><strong>Renda Mensal:</strong> ${formatarMoeda(membro.rendaMensal || 0)}</p>
    </div>
  `).join('');
}

/**
 * Renderiza todos os dados
 */
function renderizarDados() {
    atualizarResumo();
    renderizarMembros();
}

/**
 * Mostra estado vazio
 */
function mostrarEstadoVazio() {
    const container = document.getElementById('members-container');
    if (container) {
        container.innerHTML = `
      <div style="text-align: center; padding: 40px 20px; color: var(--text-muted);">
        <div>
          Nenhum membro cadastrado na sua família
        </div>
      </div>
    `;
    }

    document.getElementById('total-membros').textContent = '0';
    document.getElementById('renda-total').textContent = 'R$ 0,00';
    document.getElementById('renda-per-capita').textContent = 'R$ 0,00';
}

/**
 * Inicializa a página
 */
document.addEventListener('DOMContentLoaded', () => {
    carregarDadosFamilia();
});
