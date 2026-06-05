const escapeHtmlText = (texto) => String(texto ?? '')
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;');

const formatarMoeda = (valor) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);

const labelStatus = (status) => {
  if (status === 'elegivel') return { texto: 'Elegível', cor: '#2e7d32' };
  if (status === 'nao-elegivel') return { texto: 'Não elegível', cor: '#c62828' };
  return { texto: 'A verificar', cor: '#b45309' };
};

const familiaComRendaTotal = (familia, rendaTotal) => {
  const membros = familia?.membros ?? [];
  if (membros.length === 0) return { membros: [{ id: 'simul', nome: 'Voce', idade: 30, parentesco: 'Titular', vinculo: 'Ativo', rendaMensal: Number(rendaTotal) }] };
  const proporcional = membros.map((m, idx) => ({ ...m, rendaMensal: idx === 0 ? Number(rendaTotal) : 0 }));
  return { ...familia, membros: proporcional };
};

const renderResultado = (resultado, original) => {
  return resultado.map((item) => {
    const orig = original.find((o) => o.beneficio.id === item.beneficio.id);
    const statusInfo = labelStatus(item.aval.status);
    const mudou = orig && orig.aval.status !== item.aval.status;
    return `
      <div class="benefit-card card-blue" style="margin-bottom: 12px; border-left: 6px solid ${escapeHtmlText(item.beneficio.cor || '#D9EEFF')};">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <h3 style="margin: 0;">${escapeHtmlText(item.beneficio.name)}</h3>
          <span style="background: ${statusInfo.cor}; color: #fff; padding: 2px 10px; border-radius: 999px; font-size: 11px; font-weight: 700;">${statusInfo.texto}</span>
        </div>
        ${mudou ? `<p style="margin-top: 8px; font-size: 12px; color: var(--text-muted);">Antes: ${labelStatus(orig.aval.status).texto}</p>` : ''}
      </div>
    `;
  }).join('');
};

const init = () => {
  const userId = obterUsuarioLogadoId();
  const familia = obterFamiliaUsuario(userId);
  const beneficios = listarColecao(STORAGE_COLECOES.beneficios).filter((b) => b.status === 'ativo');
  const requisitos = listarColecao(STORAGE_COLECOES.requisitos);
  const quiz = obterQuizUsuario(userId);

  const rendaAtual = (familia.membros ?? []).reduce((sum, m) => sum + Number(m.rendaMensal ?? 0), 0);
  const perCapitaAtual = calcularRendaPerCapita(familia);

  document.getElementById('simulacao-base').innerHTML = `
    <div class="benefit-card card-blue">
      <h3>Sua situação atual</h3>
      <p><strong>Renda total:</strong> ${formatarMoeda(rendaAtual)}</p>
      <p><strong>Renda per capita:</strong> ${perCapitaAtual !== null ? formatarMoeda(perCapitaAtual) : 'Sem membros cadastrados'}</p>
      <p><strong>Membros:</strong> ${familia.membros?.length ?? 0}</p>
    </div>
  `;

  const original = beneficios.map((b) => ({ beneficio: b, aval: avaliarBeneficio(b, familia, quiz, requisitos) }));

  const input = document.getElementById('simul-renda');
  input.value = rendaAtual.toFixed(2);

  const atualizar = () => {
    const nova = parseFloat(input.value);
    if (Number.isNaN(nova) || nova < 0) {
      document.getElementById('simul-resultado').innerHTML = '<p>Informe uma renda válida.</p>';
      return;
    }
    const fSimul = familiaComRendaTotal(familia, nova);
    const perCapitaSimul = calcularRendaPerCapita(fSimul);
    document.getElementById('simul-per-capita').textContent = `Per capita simulada: ${formatarMoeda(perCapitaSimul)}`;
    const simulado = beneficios.map((b) => ({ beneficio: b, aval: avaliarBeneficio(b, fSimul, quiz, requisitos) }));
    document.getElementById('simul-resultado').innerHTML = renderResultado(simulado, original);
  };

  input.addEventListener('input', atualizar);
  atualizar();
};

document.addEventListener('DOMContentLoaded', init);
