const escapeHtmlText = (texto) => String(texto ?? '')
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;');

const formularPergunta = (descricao, nome) => descricao && descricao.length > 0 ? descricao : `Você atende: ${nome}?`;

const renderForm = (requisitosNaoRenda) => {
  const blocoRenda = `
    <div class="benefit-card card-blue" style="margin-bottom: 12px;">
      <h3>Sua renda</h3>
      <label for="triagem-renda" style="display: block; margin-top: 8px; font-weight: 600;">Renda total mensal da família (R$)</label>
      <input id="triagem-renda" type="number" min="0" step="50" class="form-input" placeholder="0,00" style="margin-top: 6px;">
      <label for="triagem-membros" style="display: block; margin-top: 12px; font-weight: 600;">Número de pessoas na família</label>
      <input id="triagem-membros" type="number" min="1" step="1" value="1" class="form-input" style="margin-top: 6px;">
    </div>
  `;

  const blocosQuiz = requisitosNaoRenda.map((r) => `
    <div class="benefit-card card-blue" style="margin-bottom: 12px;">
      <h3>${escapeHtmlText(r.name)}</h3>
      <p style="font-size: 13px; color: var(--text-muted);">${escapeHtmlText(formularPergunta(r.description, r.name))}</p>
      <div style="display: flex; gap: 16px; margin-top: 12px;">
        <label style="display: flex; align-items: center; gap: 6px; cursor: pointer;">
          <input type="radio" name="req-${escapeHtmlText(r.id)}" value="sim">
          <span>Sim</span>
        </label>
        <label style="display: flex; align-items: center; gap: 6px; cursor: pointer;">
          <input type="radio" name="req-${escapeHtmlText(r.id)}" value="nao">
          <span>Não</span>
        </label>
      </div>
    </div>
  `).join('');

  return blocoRenda + blocosQuiz;
};

const renderResultado = (avaliacoes) => {
  const elegiveis = avaliacoes.filter((a) => a.aval.status === 'elegivel');
  const indeterminados = avaliacoes.filter((a) => a.aval.status === 'indeterminado');

  const card = (item) => {
    const cor = item.beneficio.cor || '#D9EEFF';
    const href = `/src/pages/benefits/beneficio.html?id=${encodeURIComponent(item.beneficio.id)}`;
    return `
      <div class="benefit-card card-blue" style="margin-bottom: 12px; border-left: 6px solid ${escapeHtmlText(cor)};">
        <h3>${escapeHtmlText(item.beneficio.name)}</h3>
        <p style="font-size: 13px;">${escapeHtmlText(item.beneficio.description)}</p>
        <a href="${href}" style="color: var(--primary); text-decoration: none; font-weight: 600;">Saiba mais &rsaquo;</a>
      </div>
    `;
  };

  let html = '<h2 style="font-family: var(--font-main); font-size: 16px; font-weight: 800; margin: 24px 0 12px;">Você provavelmente tem direito a</h2>';
  html += elegiveis.length === 0 ? '<p style="font-size: 13px; color: var(--text-muted);">Nenhum benefício compatível com os dados informados.</p>' : elegiveis.map(card).join('');
  if (indeterminados.length > 0) {
    html += '<h2 style="font-family: var(--font-main); font-size: 16px; font-weight: 800; margin: 24px 0 12px;">A verificar</h2>';
    html += indeterminados.map(card).join('');
  }
  html += `
    <div class="benefit-card card-blue" style="margin-top: 20px; background: #f8f9fa;">
      <h3>Quer acompanhamento completo?</h3>
      <p style="font-size: 13px;">Crie uma conta para salvar seu progresso, marcar documentos e simular mudanças na renda.</p>
      <a href="/src/pages/register/register.html" class="btn btn-primary" style="display: inline-block; margin-top: 12px;">Criar conta</a>
    </div>
  `;
  return html;
};

const init = () => {
  const beneficios = listarColecao(STORAGE_COLECOES.beneficios).filter((b) => b.status === 'ativo');
  const requisitos = listarColecao(STORAGE_COLECOES.requisitos);
  const naoRenda = listarRequisitosNaoRenda(beneficios, requisitos);

  document.getElementById('triagem-form').innerHTML = renderForm(naoRenda);

  document.getElementById('btn-triagem').addEventListener('click', () => {
    const renda = parseFloat(document.getElementById('triagem-renda').value);
    const membros = parseInt(document.getElementById('triagem-membros').value, 10);
    if (Number.isNaN(renda) || renda < 0) {
      alert('Informe a renda total.');
      return;
    }
    if (!membros || membros < 1) {
      alert('Informe o número de membros (mínimo 1).');
      return;
    }

    const familia = {
      membros: Array.from({ length: membros }, (_, i) => ({
        id: i + 1,
        nome: i === 0 ? 'Você' : `Membro ${i + 1}`,
        rendaMensal: i === 0 ? renda : 0
      }))
    };

    const quiz = {};
    naoRenda.forEach((r) => {
      const sel = document.querySelector(`input[name="req-${r.id}"]:checked`);
      if (sel) quiz[r.id] = sel.value;
    });

    const avaliacoes = beneficios.map((b) => ({ beneficio: b, aval: avaliarBeneficio(b, familia, quiz, requisitos) }));
    document.getElementById('triagem-resultado').innerHTML = renderResultado(avaliacoes);
    document.getElementById('triagem-resultado').scrollIntoView({ behavior: 'smooth' });
  });
};

document.addEventListener('DOMContentLoaded', init);
