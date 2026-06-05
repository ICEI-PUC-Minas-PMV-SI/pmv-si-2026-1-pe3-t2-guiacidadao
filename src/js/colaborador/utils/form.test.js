import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'fs';

beforeAll(() => {
  const source = readFileSync('src/js/colaborador/utils/form.js', 'utf-8');
  globalThis.eval(source);
});

describe('isValidEmail', () => {
  it('aceita formato valido', () => {
    expect(isValidEmail('maria@exemplo.com')).toBe(true);
    expect(isValidEmail('a.b+tag@dominio.co.uk')).toBe(true);
  });

  it('rejeita formato invalido', () => {
    expect(isValidEmail('sem-arroba.com')).toBe(false);
    expect(isValidEmail('com@espaco aqui.com')).toBe(false);
    expect(isValidEmail('')).toBe(false);
    expect(isValidEmail(null)).toBe(false);
  });
});

describe('isValidCpf', () => {
  it('aceita CPF valido com 11 digitos', () => {
    expect(isValidCpf('11144477735')).toBe(true);
    expect(isValidCpf('111.444.777-35')).toBe(true);
  });

  it('rejeita CPF com tamanho errado', () => {
    expect(isValidCpf('123')).toBe(false);
    expect(isValidCpf('1234567890')).toBe(false);
    expect(isValidCpf('123456789012')).toBe(false);
  });

  it('rejeita CPF com todos digitos iguais', () => {
    expect(isValidCpf('11111111111')).toBe(false);
    expect(isValidCpf('00000000000')).toBe(false);
  });

  it('rejeita CPF com digito verificador errado', () => {
    expect(isValidCpf('11144477700')).toBe(false);
  });

  it('rejeita null undefined vazio', () => {
    expect(isValidCpf(null)).toBe(false);
    expect(isValidCpf(undefined)).toBe(false);
    expect(isValidCpf('')).toBe(false);
  });
});

describe('maskCpf', () => {
  it('formata 11 digitos com pontos e traco', () => {
    expect(maskCpf('11144477735')).toBe('111.444.777-35');
  });

  it('mantem mascara ja aplicada', () => {
    expect(maskCpf('111.444.777-35')).toBe('111.444.777-35');
  });

  it('retorna string vazia para entrada vazia', () => {
    expect(maskCpf('')).toBe('');
    expect(maskCpf(null)).toBe('');
  });
});

describe('parseCurrency', () => {
  it('parseia string com virgula como decimal', () => {
    expect(parseCurrency('1500,50')).toBe(1500.5);
    expect(parseCurrency('0,75')).toBe(0.75);
  });

  it('parseia string com ponto como decimal', () => {
    expect(parseCurrency('1500.50')).toBe(1500.5);
  });

  it('parseia inteiros', () => {
    expect(parseCurrency('1500')).toBe(1500);
  });

  it('retorna NaN para entrada invalida', () => {
    expect(Number.isNaN(parseCurrency('abc'))).toBe(true);
    expect(Number.isNaN(parseCurrency(''))).toBe(true);
    expect(Number.isNaN(parseCurrency(null))).toBe(true);
  });
});

describe('formatCurrency', () => {
  it('formata numero como moeda brasileira', () => {
    expect(formatCurrency(1500.5)).toMatch(/^R\$\s*1\.500,50$/);
    expect(formatCurrency(0)).toMatch(/^R\$\s*0,00$/);
  });

  it('formata inteiros', () => {
    expect(formatCurrency(1000)).toMatch(/^R\$\s*1\.000,00$/);
  });
});
