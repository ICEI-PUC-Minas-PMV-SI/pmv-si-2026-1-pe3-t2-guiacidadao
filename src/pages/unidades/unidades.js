const escapeHtmlText = (texto) => String(texto ?? '')
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;');

const normalizarCep = (cep) => String(cep ?? '').replace(/\D/g, '');

const distanciaCep = (cepA, cepB) => {
  const a = parseInt(normalizarCep(cepA), 10);
  const b = parseInt(normalizarCep(cepB), 10);
  if (Number.isNaN(a) || Number.isNaN(b)) return Number.POSITIVE_INFINITY;
  return Math.abs(a - b);
};

const formatarCep = (cep) => {
  const n = normalizarCep(cep);
  if (n.length !== 8) return cep;
  return `${n.slice(0, 5)}-${n.slice(5)}`;
};

const labelTipo = (tipo) => {
  const tipos = typeof MOCK_UNIDADE_TYPES !== 'undefined' ? MOCK_UNIDADE_TYPES : [];
  const t = tipos.find((x) => x.value === tipo);
  return t ? t.label : tipo;
};

const renderUnidade = (u, distancia) => {
  const tipo = labelTipo(u.type);
  const distLinha = distancia !== null && Number.isFinite(distancia)
    ? `<p style="font-size: 12px; color: var(--text-muted); margin-top: 4px;">Distância estimada por CEP: ${distancia.toLocaleString('pt-BR')}</p>`
    : '';
  return `
    <div class="benefit-card card-blue" style="margin-bottom: 12px;">
      <h3>${escapeHtmlText(u.name)}</h3>
      <p style="font-size: 13px;"><strong>${escapeHtmlText(tipo)}</strong></p>
      <p style="font-size: 13px;">${escapeHtmlText(u.address)}</p>
      <p style="font-size: 13px;">CEP ${escapeHtmlText(formatarCep(u.cep))} - Tel ${escapeHtmlText(u.phone)}</p>
      <p style="font-size: 13px;">${escapeHtmlText(u.schedule)}</p>
      ${distLinha}
    </div>
  `;
};

const aplicarMascaraCep = (input) => {
  input.addEventListener('input', () => {
    const valor = normalizarCep(input.value).slice(0, 8);
    input.value = valor.length > 5 ? `${valor.slice(0, 5)}-${valor.slice(5)}` : valor;
  });
};

const init = () => {
  const todasUnidades = listarColecao(STORAGE_COLECOES.unidades).filter((u) => u.status === 'ativo');

  const filtroTipo = document.getElementById('filtro-tipo');
  (typeof MOCK_UNIDADE_TYPES !== 'undefined' ? MOCK_UNIDADE_TYPES : []).forEach((t) => {
    const opt = document.createElement('option');
    opt.value = t.value;
    opt.textContent = t.label;
    filtroTipo.appendChild(opt);
  });

  const cepInput = document.getElementById('busca-cep');
  const cepFeedback = document.getElementById('cep-feedback');
  aplicarMascaraCep(cepInput);

  const renderLista = () => {
    const cepUsuario = normalizarCep(cepInput.value);
    const tipo = filtroTipo.value;

    let filtradas = todasUnidades;
    if (tipo !== 'todos') filtradas = filtradas.filter((u) => u.type === tipo);

    if (cepUsuario.length === 8) {
      filtradas = filtradas
        .map((u) => ({ u, dist: distanciaCep(cepUsuario, u.cep) }))
        .sort((a, b) => a.dist - b.dist)
        .map(({ u, dist }) => ({ ...u, _dist: dist }));
    }

    const container = document.getElementById('lista-unidades');
    if (filtradas.length === 0) {
      container.innerHTML = '<p style="font-size: 13px; color: var(--text-muted); padding: 12px 0;">Nenhuma unidade encontrada com esses filtros.</p>';
      return;
    }

    container.innerHTML = filtradas.map((u) => renderUnidade(u, cepUsuario.length === 8 ? u._dist : null)).join('');
    document.getElementById('lista-titulo').textContent = cepUsuario.length === 8 ? 'Unidades mais próximas' : 'Unidades disponíveis';
  };

  const consultarViaCep = async (cep) => {
    if (cep.length !== 8) return null;
    try {
      const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      if (!res.ok) return null;
      const data = await res.json();
      if (data.erro) return null;
      return data;
    } catch {
      return null;
    }
  };

  let timerCep = null;
  cepInput.addEventListener('input', () => {
    renderLista();
    clearTimeout(timerCep);
    const cep = normalizarCep(cepInput.value);
    if (cep.length !== 8) {
      cepFeedback.textContent = '';
      return;
    }
    cepFeedback.textContent = 'Consultando endereço...';
    timerCep = setTimeout(async () => {
      const dados = await consultarViaCep(cep);
      if (!dados) {
        cepFeedback.textContent = 'CEP não encontrado. Listando por proximidade numérica.';
        return;
      }
      cepFeedback.textContent = `${dados.logradouro || ''}${dados.logradouro ? ', ' : ''}${dados.bairro || ''} - ${dados.localidade}/${dados.uf}`;
    }, 400);
  });

  filtroTipo.addEventListener('change', renderLista);
  renderLista();
};

document.addEventListener('DOMContentLoaded', init);
