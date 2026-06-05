const HASH_PREFIX = 'sha256:';

const bytesParaHex = (buffer) => Array.from(new Uint8Array(buffer))
  .map((b) => b.toString(16).padStart(2, '0'))
  .join('');

const hashSenha = async (senha) => {
  const data = new TextEncoder().encode(String(senha));
  const buffer = await crypto.subtle.digest('SHA-256', data);
  return `${HASH_PREFIX}${bytesParaHex(buffer)}`;
};

const senhaEhHash = (valor) => typeof valor === 'string' && valor.startsWith(HASH_PREFIX);

const compararSenha = async (senhaDigitada, senhaArmazenada) => {
  if (!senhaArmazenada) return false;
  if (!senhaEhHash(senhaArmazenada)) {
    return String(senhaDigitada) === String(senhaArmazenada);
  }
  const hashed = await hashSenha(senhaDigitada);
  return hashed === senhaArmazenada;
};

globalThis.hashSenha = hashSenha;
globalThis.senhaEhHash = senhaEhHash;
globalThis.compararSenha = compararSenha;
