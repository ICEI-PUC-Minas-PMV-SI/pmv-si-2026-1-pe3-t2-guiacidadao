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

const renderBeneficio = (beneficio) => {
  const cor = beneficio.cor || '#D9EEFF';
  const corStyle = `border-color: ${escapeHtmlText(cor)};`;
  const headerStyle = `background-color: ${escapeHtmlText(cor)}; align-self: center; height: 100px; width: 200px; ${corStyle}`;

  return `
    <div class="beneficiocard" style="${headerStyle}">
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

        ${beneficio.officialLink ? `<p style="margin-top: 20px;"><a href="${escapeHtmlText(beneficio.officialLink)}" target="_blank" rel="noopener">Link oficial</a></p>` : ''}
      </div>
    </div>
  `;
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
};

document.addEventListener('DOMContentLoaded', init);
