const escapeHtmlText = (texto) => String(texto ?? '')
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;');

const badgeElegibilidade = (status) => {
  if (status === 'elegivel') {
    return '<span style="display: inline-block; background: #2e7d32; color: #fff; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 999px; margin-bottom: 6px;">Elegível</span>';
  }
  if (status === 'nao-elegivel') {
    return '<span style="display: inline-block; background: #c62828; color: #fff; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 999px; margin-bottom: 6px;">Não elegível</span>';
  }
  return '<span style="display: inline-block; background: #ed6c02; color: #fff; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 999px; margin-bottom: 6px;">Verificar</span>';
};

const renderCard = (beneficio, statusElegibilidade) => {
  const cor = beneficio.cor || '#D9EEFF';
  const icone = beneficio.icon ? `<img src="${escapeHtmlText(beneficio.icon)}" alt="${escapeHtmlText(beneficio.name)}" style="max-block-size: 80px;" />` : '';
  const descricao = beneficio.description || '';
  const href = `/src/pages/benefits/beneficio.html?id=${encodeURIComponent(beneficio.id)}`;

  return `
    <div class="beneficio" style="background-color: ${escapeHtmlText(cor)};">
      ${icone}
      <br>
      ${badgeElegibilidade(statusElegibilidade)}
      <h2>${escapeHtmlText(beneficio.name)}</h2>
      <br>
      <p style="font-size: 13px;">${escapeHtmlText(descricao)}</p>
      <br>
      <a href="${href}" style="color: var(--primary); text-decoration: none;">Saiba mais &rsaquo;</a>
    </div>
  `;
};

const renderBeneficios = () => {
  const container = document.getElementById('beneficios-list');
  if (!container) return;

  const ativos = listarColecao(STORAGE_COLECOES.beneficios).filter((b) => b.status === 'ativo');

  if (ativos.length === 0) {
    container.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; padding: 24px;">Nenhum benefício disponível no momento.</p>';
    return;
  }

  const requisitos = listarColecao(STORAGE_COLECOES.requisitos);
  const familia = obterFamiliaUsuario();
  const quiz = obterQuizUsuario();

  const cards = ativos.map((b) => {
    const aval = avaliarBeneficio(b, familia, quiz, requisitos);
    return renderCard(b, aval.status);
  });

  container.innerHTML = cards.join('');
};

document.addEventListener('DOMContentLoaded', renderBeneficios);
