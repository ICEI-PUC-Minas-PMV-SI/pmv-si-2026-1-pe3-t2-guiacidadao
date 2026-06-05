import { describe, it, expect, beforeAll, beforeEach } from 'vitest';
import { readFileSync } from 'fs';

beforeAll(() => {
  globalThis.eval(readFileSync('src/js/colaborador/mocks/profile.js', 'utf-8'));
  globalThis.eval(readFileSync('src/pages/login/login-controller.js', 'utf-8'));
});

beforeEach(() => {
  localStorage.clear();
});

describe('detectarPapelAtivo', () => {
  it('retorna cidadao quando tab cidadao esta ativa', () => {
    document.body.innerHTML = `<div id="tabs"><button class="auth-tab auth-tab--active" data-tab="cidadao"></button><button class="auth-tab" data-tab="colaborador"></button></div>`;
    expect(detectarPapelAtivo(document.getElementById('tabs'))).toBe('cidadao');
  });

  it('retorna colaborador quando tab colaborador esta ativa', () => {
    document.body.innerHTML = `<div id="tabs"><button class="auth-tab" data-tab="cidadao"></button><button class="auth-tab auth-tab--active" data-tab="colaborador"></button></div>`;
    expect(detectarPapelAtivo(document.getElementById('tabs'))).toBe('colaborador');
  });

  it('retorna cidadao quando nenhuma tab ativa (fallback)', () => {
    document.body.innerHTML = `<div id="tabs"><button class="auth-tab" data-tab="cidadao"></button></div>`;
    expect(detectarPapelAtivo(document.getElementById('tabs'))).toBe('cidadao');
  });
});

describe('validarCredencial - cidadao', () => {
  it('valida cidadao quando bate em userlist', () => {
    localStorage.setItem('userlist', JSON.stringify([{ cpf: '111', email: 'a@b.com', pass: '123', nome: 'Joao' }]));
    const result = validarCredencial('cidadao', { ident: 'a@b.com', senha: '123' });
    expect(result.valido).toBe(true);
    expect(result.usuario.nome).toBe('Joao');
  });

  it('valida cidadao por cpf ou email', () => {
    localStorage.setItem('userlist', JSON.stringify([{ cpf: '111', email: 'a@b.com', pass: '123', nome: 'Joao' }]));
    expect(validarCredencial('cidadao', { ident: '111', senha: '123' }).valido).toBe(true);
  });

  it('falha quando cidadao nao bate', () => {
    localStorage.setItem('userlist', JSON.stringify([]));
    const result = validarCredencial('cidadao', { ident: 'x', senha: 'y' });
    expect(result.valido).toBe(false);
    expect(result.mensagem).toContain('inv');
  });

  it('falha quando userlist nao existe', () => {
    expect(validarCredencial('cidadao', { ident: 'x', senha: 'y' }).valido).toBe(false);
  });
});

describe('validarCredencial - colaborador', () => {
  it('valida colaborador quando campos nao vazios', () => {
    const result = validarCredencial('colaborador', { ident: 'a@b.com', senha: '123' });
    expect(result.valido).toBe(true);
    expect(result.usuario).toBe(MOCK_PROFILE);
  });

  it('falha quando ident vazio', () => {
    const result = validarCredencial('colaborador', { ident: '', senha: '123' });
    expect(result.valido).toBe(false);
  });

  it('falha quando senha vazia', () => {
    const result = validarCredencial('colaborador', { ident: 'x', senha: '' });
    expect(result.valido).toBe(false);
  });
});

describe('salvarSessao', () => {
  it('grava usuario com role em usuarioLogado', () => {
    salvarSessao({ nome: 'Joao' }, 'cidadao');
    const saved = JSON.parse(localStorage.getItem('usuarioLogado'));
    expect(saved.nome).toBe('Joao');
    expect(saved.role).toBe('cidadao');
  });
});

describe('obterDestinoRedirect', () => {
  it('retorna home para cidadao', () => {
    expect(obterDestinoRedirect('cidadao')).toBe('/src/pages/home/home.html');
  });

  it('retorna painel para colaborador', () => {
    expect(obterDestinoRedirect('colaborador')).toBe('/src/pages/colaborador/painel/painel.html');
  });
});
