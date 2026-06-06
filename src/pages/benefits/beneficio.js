const escapeHtmlText = (texto) => String(texto ?? '')
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;');

const obterIdDaUrl = () => new URLSearchParams(window.location.search).get('id');

const renderListaDireito = (itens) => {
  if (!itens || itens.length === 0) return '';
  return itens.map((item) => `- ${escapeHtmlText(item)}`).join('<br>\n            ');
};

const renderDocumentacao = (docs) => {
  if (!docs || docs.length === 0) return '<p>Nenhuma documentação informada.</p>';
  return docs.map((doc) => {
    const label = `<strong>- ${escapeHtmlText(doc.label)}${doc.descricao ? ':' : ''}</strong>`;
    const descricao = doc.descricao ? ` ${escapeHtmlText(doc.descricao)}` : '';
    return `${label}${descricao}<br>`;
  }).join('\n            ');
};

const STATUS_LABEL = {
  obtido: 'Obtido',
  pendente: 'Pendente',
  'nao-aplicavel': 'Não aplicável'
};

const STATUS_COR = {
  obtido: '#2e7d32',
  pendente: '#ed6c02',
  'nao-aplicavel': '#757575'
};

const renderBotaoStatus = (docId, status, atual) => {
  const ativo = status === atual;
  const cor = ativo ? STATUS_COR[status] : '#e0e0e0';
  const corTexto = ativo ? '#fff' : '#555';
  return `<button type="button" class="checklist-btn" data-doc="${escapeHtmlText(docId)}" data-status="${status}" style="background: ${cor}; color: ${corTexto}; border: none; padding: 4px 10px; border-radius: 999px; font-size: 12px; font-weight: 600; cursor: pointer; margin-right: 4px;">${STATUS_LABEL[status]}</button>`;
};

const renderChecklist = (beneficio, corStyle) => {
  const ids = beneficio.documents ?? [];
  if (ids.length === 0) return '';

  const userId = obterUsuarioLogadoId();
  if (!userId) {
    return `
      <div class="beneficiocard" style="margin-top: 20px; ${corStyle}">
        <h2>Seu progresso</h2>
        <p style="font-size: 13px;">Faça <a href="/src/pages/login/login.html">login</a> para marcar os documentos que você já reuniu.</p>
      </div>
    `;
  }

  const docs = ids.map((id) => obterColecao(STORAGE_COLECOES.documentos, id)).filter(Boolean);
  if (docs.length === 0) return '';

  const checklist = obterChecklistUsuario(userId);
  const beneficioChecklist = checklist[beneficio.id] ?? {};

  const linhas = docs.map((doc) => {
    const atual = beneficioChecklist[doc.id] ?? 'pendente';
    return `
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid rgba(0,0,0,0.08); gap: 12px; flex-wrap: wrap;">
        <strong style="flex: 1; min-width: 120px;">${escapeHtmlText(doc.name)}</strong>
        <div>
          ${renderBotaoStatus(doc.id, 'pendente', atual)}
          ${renderBotaoStatus(doc.id, 'obtido', atual)}
          ${renderBotaoStatus(doc.id, 'nao-aplicavel', atual)}
        </div>
      </div>
    `;
  }).join('');

  const total = docs.length;
  const obtidos = docs.filter((d) => beneficioChecklist[d.id] === 'obtido').length;
  const naoAplicavel = docs.filter((d) => beneficioChecklist[d.id] === 'nao-aplicavel').length;
  const aplicaveis = total - naoAplicavel;
  const pct = aplicaveis === 0 ? 100 : Math.round((obtidos / aplicaveis) * 100);

  return `
    <div class="beneficiocard" style="margin-top: 20px; ${corStyle}" id="checklist-card">
      <h2>Seu progresso</h2>
      <p style="font-size: 13px; margin-bottom: 8px;">${obtidos} de ${aplicaveis} documentos aplicáveis obtidos (${pct}%).</p>
      <div style="width: 100%; height: 8px; background: #eee; border-radius: 999px; overflow: hidden; margin-bottom: 16px;">
        <div style="width: ${pct}%; height: 100%; background: #2e7d32; transition: width 0.3s;"></div>
      </div>
      ${linhas}
    </div>
  `;
};

const renderBeneficio = (beneficio) => {
  const cor = beneficio.cor || '#D9EEFF';
  const corStyle = `border-color: ${escapeHtmlText(cor)};`;
  const headerStyle = `background-color: ${escapeHtmlText(cor)}; align-self: center; height: 100px; width: 200px; ${corStyle}`;

  return `
    <div class="beneficiocard2" style="${headerStyle}">
      ${beneficio.icon ? `<img src="${escapeHtmlText(beneficio.icon)}" alt="${escapeHtmlText(beneficio.name)}" style="max-block-size: 80px;" class="imgbenefi"/>` : ''}
    </div>
    <br>
    <div class="page-title">${escapeHtmlText(beneficio.name)}</div>
    <div class="scroll-content">
      <div style="padding:24px 20px;">
        <div class="beneficiocard" style="${corStyle}">
          <h2>O que é?</h2>
          <p>${escapeHtmlText(beneficio.descricaoLonga || beneficio.description)}</p>
        </div>

        <div class="beneficiocard" style="margin-top: 20px; ${corStyle}">
          <h2>Quem tem direito?</h2>
            ${renderListaDireito(beneficio.quemTemDireito)}
        </div>

        <div class="beneficiocard" style="margin-top: 20px; ${corStyle}">
          <h2>Requisitos de Renda</h2>
          <p>${escapeHtmlText(beneficio.requisitosRenda || 'Não informado.')}</p>
        </div>

        <div class="beneficiocard" style="margin-top: 20px; ${corStyle}">
          <h2>Documentação Necessária</h2>
            ${renderDocumentacao(beneficio.documentacao)}
        </div>

        ${renderChecklist(beneficio, corStyle)}

        ${beneficio.officialLink ? `<p style="margin-top: 20px;"><a href="${escapeHtmlText(beneficio.officialLink)}" target="_blank" rel="noopener">Link oficial</a></p>` : ''}
      </div>
    </div>
  `;
};

const wireChecklist = (beneficio) => {
  const card = document.getElementById('checklist-card');
  if (!card) return;
  card.addEventListener('click', (event) => {
    const btn = event.target.closest('.checklist-btn');
    if (!btn) return;
    const docId = btn.dataset.doc;
    const status = btn.dataset.status;
    marcarDocumentoChecklist(beneficio.id, docId, status);
    const corStyle = `border-color: ${beneficio.cor || '#D9EEFF'};`;
    card.outerHTML = renderChecklist(beneficio, corStyle);
    wireChecklist(beneficio);
  });
};

const init = () => {
  const id = obterIdDaUrl();
  const beneficio = id ? obterColecao(STORAGE_COLECOES.beneficios, id) : null;

  const conteudo = document.getElementById('beneficio-content');

  if (!beneficio) {
    conteudo.innerHTML = `
      <div class="scroll-content">
        <div style="padding: 24px 20px;">
          <div class="page-title">Benefício não encontrado</div>
          <p style="text-align: center; margin-top: 16px;">
            <a href="/src/pages/home/home.html">Voltar para a home</a>
          </p>
        </div>
      </div>
    `;
    return;
  }

  document.title = `${beneficio.name} - GuiaCidadão`;
  conteudo.innerHTML = renderBeneficio(beneficio);
  wireChecklist(beneficio);
};

document.addEventListener('DOMContentLoaded', init);
