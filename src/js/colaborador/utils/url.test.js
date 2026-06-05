import { describe, it, expect, beforeAll, beforeEach } from 'vitest';
import { readFileSync } from 'fs';

beforeAll(() => {
  const source = readFileSync('src/js/colaborador/utils/url.js', 'utf-8');
  globalThis.eval(source);
});

beforeEach(() => {
  window.history.replaceState({}, '', '/');
});

describe('getQueryParam', () => {
  it('retorna valor quando parametro existe', () => {
    window.history.replaceState({}, '', '/?id=42');
    expect(getQueryParam('id')).toBe('42');
  });

  it('retorna null quando parametro ausente', () => {
    window.history.replaceState({}, '', '/');
    expect(getQueryParam('id')).toBe(null);
  });

  it('lida com multiplos parametros', () => {
    window.history.replaceState({}, '', '/?id=42&tipo=ben');
    expect(getQueryParam('id')).toBe('42');
    expect(getQueryParam('tipo')).toBe('ben');
  });

  it('decodifica valores percent-encoded', () => {
    window.history.replaceState({}, '', '/?nome=Maria%20Silva');
    expect(getQueryParam('nome')).toBe('Maria Silva');
  });
});

describe('buildHref', () => {
  it('retorna path inalterado quando nao ha params', () => {
    expect(buildHref('/foo')).toBe('/foo');
    expect(buildHref('/foo', null)).toBe('/foo');
    expect(buildHref('/foo', {})).toBe('/foo?');
  });

  it('anexa query string com 1 parametro', () => {
    expect(buildHref('/foo', { id: 42 })).toBe('/foo?id=42');
  });

  it('anexa query string com varios parametros', () => {
    const result = buildHref('/foo', { id: 42, tipo: 'ben' });
    expect(result).toBe('/foo?id=42&tipo=ben');
  });

  it('encoda valores com caracteres especiais', () => {
    expect(buildHref('/foo', { nome: 'Maria Silva' })).toBe('/foo?nome=Maria+Silva');
  });
});
