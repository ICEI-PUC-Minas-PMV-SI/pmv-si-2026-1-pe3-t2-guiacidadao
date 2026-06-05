const STORAGE_PREFIX = 'guiacidadao';

const COLECOES = {
  beneficios: 'beneficios',
  documentos: 'documentos',
  requisitos: 'requisitos',
  unidades: 'unidades',
  familia: 'familia'
};

const SEEDS = {};

const chave = (colecao) => `${STORAGE_PREFIX}:${colecao}`;

const lerBruto = (colecao) => {
  try {
    const raw = localStorage.getItem(chave(colecao));
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const gravarBruto = (colecao, dados) => {
  localStorage.setItem(chave(colecao), JSON.stringify(dados));
};

const semear = (colecao) => {
  const seed = SEEDS[colecao];
  if (!Array.isArray(seed)) return [];
  const copia = JSON.parse(JSON.stringify(seed));
  gravarBruto(colecao, copia);
  return copia;
};

const registrarSeed = (colecao, dados) => {
  SEEDS[colecao] = dados;
  if (lerBruto(colecao) === null) {
    semear(colecao);
  }
};

const listar = (colecao) => {
  const atual = lerBruto(colecao);
  if (atual === null) return semear(colecao);
  return Array.isArray(atual) ? atual : [];
};

const obter = (colecao, id) => listar(colecao).find((item) => item.id === id) ?? null;

const proximoId = (colecao, prefixo) => {
  const itens = listar(colecao);
  const numeros = itens
    .map((item) => item.id ?? '')
    .map((id) => id.startsWith(`${prefixo}-`) ? Number(id.slice(prefixo.length + 1)) : NaN)
    .filter((n) => Number.isInteger(n));
  const max = numeros.length ? Math.max(...numeros) : 0;
  return `${prefixo}-${max + 1}`;
};

const salvar = (colecao, item) => {
  const itens = listar(colecao);
  const idx = itens.findIndex((existente) => existente.id === item.id);
  if (idx >= 0) {
    itens[idx] = { ...itens[idx], ...item };
  } else {
    itens.push(item);
  }
  gravarBruto(colecao, itens);
  return item;
};

const remover = (colecao, id) => {
  const itens = listar(colecao).filter((item) => item.id !== id);
  gravarBruto(colecao, itens);
};

const definirStatus = (colecao, id, status) => {
  const item = obter(colecao, id);
  if (!item) return null;
  return salvar(colecao, { ...item, status });
};

const obterObjeto = (colecao) => {
  const atual = lerBruto(colecao);
  if (atual && !Array.isArray(atual)) return atual;
  return null;
};

const salvarObjeto = (colecao, objeto) => {
  gravarBruto(colecao, objeto);
  return objeto;
};

const limparTudo = () => {
  Object.values(COLECOES).forEach((colecao) => {
    localStorage.removeItem(chave(colecao));
  });
};

const obterUsuarioLogadoId = () => {
  try {
    const raw = localStorage.getItem('usuarioLogado');
    if (!raw) return null;
    const u = JSON.parse(raw);
    return u.id ?? u.cpf ?? u.email ?? null;
  } catch {
    return null;
  }
};

const chaveQuiz = (userId) => `${STORAGE_PREFIX}:quiz:${userId}`;
const chaveChecklist = (userId) => `${STORAGE_PREFIX}:checklist:${userId}`;
const chaveFamilia = (userId) => `familia_${userId}`;

const obterFamiliaUsuario = (userId) => {
  const id = userId ?? obterUsuarioLogadoId();
  if (!id) return { membros: [] };
  try {
    const raw = localStorage.getItem(chaveFamilia(id));
    return raw ? JSON.parse(raw) : { membros: [] };
  } catch {
    return { membros: [] };
  }
};

const obterQuizUsuario = (userId) => {
  const id = userId ?? obterUsuarioLogadoId();
  if (!id) return {};
  try {
    const raw = localStorage.getItem(chaveQuiz(id));
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

const salvarQuizUsuario = (respostas, userId) => {
  const id = userId ?? obterUsuarioLogadoId();
  if (!id) return null;
  localStorage.setItem(chaveQuiz(id), JSON.stringify(respostas));
  return respostas;
};

const obterChecklistUsuario = (userId) => {
  const id = userId ?? obterUsuarioLogadoId();
  if (!id) return {};
  try {
    const raw = localStorage.getItem(chaveChecklist(id));
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

const marcarDocumentoChecklist = (beneficioId, docId, status, userId) => {
  const id = userId ?? obterUsuarioLogadoId();
  if (!id) return null;
  const checklist = obterChecklistUsuario(id);
  checklist[beneficioId] = checklist[beneficioId] ?? {};
  if (status === null) {
    delete checklist[beneficioId][docId];
  } else {
    checklist[beneficioId][docId] = status;
  }
  localStorage.setItem(chaveChecklist(id), JSON.stringify(checklist));
  return checklist[beneficioId];
};

globalThis.STORAGE_COLECOES = COLECOES;
globalThis.registrarSeed = registrarSeed;
globalThis.listarColecao = listar;
globalThis.obterColecao = obter;
globalThis.salvarColecao = salvar;
globalThis.removerColecao = remover;
globalThis.definirStatusColecao = definirStatus;
globalThis.proximoIdColecao = proximoId;
globalThis.obterObjetoColecao = obterObjeto;
globalThis.salvarObjetoColecao = salvarObjeto;
globalThis.limparStorageGuiaCidadao = limparTudo;
globalThis.obterUsuarioLogadoId = obterUsuarioLogadoId;
globalThis.obterFamiliaUsuario = obterFamiliaUsuario;
globalThis.obterQuizUsuario = obterQuizUsuario;
globalThis.salvarQuizUsuario = salvarQuizUsuario;
globalThis.obterChecklistUsuario = obterChecklistUsuario;
globalThis.marcarDocumentoChecklist = marcarDocumentoChecklist;
