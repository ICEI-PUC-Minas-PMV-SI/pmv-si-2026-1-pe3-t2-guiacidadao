const escapeHtmlText = (texto) => String(texto ?? '')
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;');

const formularPergunta = (descricao, nome) => {
  if (descricao && descricao.length > 0) return descricao;
  return `Você atende: ${nome}?`;
};

const renderPergunta = (requisito, respostaAtual) => {
  const checkedSim = respostaAtual === 'sim' ? 'checked' : '';
  const checkedNao = respostaAtual === 'nao' ? 'checked' : '';
  const pergunta = formularPergunta(requisito.description, requisito.name);
  return `
    <div class="benefit-card card-blue" style="margin-bottom: 12px;">
      <h3>${escapeHtmlText(requisito.name)}</h3>
      <p style="font-size: 13px; color: var(--text-muted);">${escapeHtmlText(pergunta)}</p>
      <div style="display: flex; gap: 16px; margin-top: 12px;">
        <label style="display: flex; align-items: center; gap: 6px; cursor: pointer;">
          <input type="radio" name="req-${escapeHtmlText(requisito.id)}" value="sim" ${checkedSim}>
          <span>Sim</span>
        </label>
        <label style="display: flex; align-items: center; gap: 6px; cursor: pointer;">
          <input type="radio" name="req-${escapeHtmlText(requisito.id)}" value="nao" ${checkedNao}>
          <span>Não</span>
        </label>
      </div>
    </div>
  `;
};

const init = () => {
  const userId = obterUsuarioLogadoId();
  if (!userId) {
    document.getElementById('quiz-perguntas').innerHTML = `
      <div class="benefit-card card-blue">
        <p>Você precisa estar logado para responder o quiz.</p>
        <a href="/src/pages/login/login.html" class="btn btn-primary" style="margin-top: 12px; display: inline-block;">Fazer login</a>
      </div>
    `;
    document.getElementById('btn-salvar-quiz').style.display = 'none';
    return;
  }

  const beneficios = listarColecao(STORAGE_COLECOES.beneficios).filter((b) => b.status === 'ativo');
  const requisitos = listarColecao(STORAGE_COLECOES.requisitos);
  const naoRenda = listarRequisitosNaoRenda(beneficios, requisitos);
  const respostas = obterQuizUsuario(userId);

  if (naoRenda.length === 0) {
    document.getElementById('quiz-perguntas').innerHTML = '<p style="text-align: center; padding: 24px; color: var(--text-muted);">Não há requisitos para responder no momento. A elegibilidade é calculada apenas pela sua renda familiar.</p>';
    document.getElementById('btn-salvar-quiz').style.display = 'none';
    return;
  }

  document.getElementById('quiz-perguntas').innerHTML = naoRenda.map((r) => renderPergunta(r, respostas[r.id])).join('');

  document.getElementById('btn-salvar-quiz').addEventListener('click', () => {
    const novasRespostas = { ...respostas };
    naoRenda.forEach((r) => {
      const sel = document.querySelector(`input[name="req-${r.id}"]:checked`);
      if (sel) novasRespostas[r.id] = sel.value;
    });
    salvarQuizUsuario(novasRespostas, userId);
    alert('Respostas salvas! Sua elegibilidade foi atualizada.');
    window.location.href = '/src/pages/meus-beneficios/dashboard.html';
  });
};

document.addEventListener('DOMContentLoaded', init);
