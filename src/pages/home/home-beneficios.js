const escapeHtmlText = (texto) => String(texto ?? '')
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;');

const renderCard = (beneficio) => {
  const cor = beneficio.cor || '#D9EEFF';
  const icone = beneficio.icon ? `<img src="${escapeHtmlText(beneficio.icon)}" alt="${escapeHtmlText(beneficio.name)}" style="max-block-size: 80px;" />` : '';
  const descricao = beneficio.description || '';
  const href = `/src/pages/benefits/beneficio.html?id=${encodeURIComponent(beneficio.id)}`;

  return `
    <div class="beneficio" style="background-color: ${escapeHtmlText(cor)};">
      ${icone}
      <br>
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

  container.innerHTML = ativos.map(renderCard).join('');
};

document.addEventListener('DOMContentLoaded', renderBeneficios);
