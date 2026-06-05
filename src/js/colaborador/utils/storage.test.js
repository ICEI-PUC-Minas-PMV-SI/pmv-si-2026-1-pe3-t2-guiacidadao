import { describe, it, expect, beforeAll, beforeEach } from 'vitest';
import { readFileSync } from 'fs';

beforeAll(() => {
  const source = readFileSync('src/js/colaborador/utils/storage.js', 'utf-8');
  globalThis.eval(source);
});

beforeEach(() => {
  localStorage.clear();
});

describe('setStorage', () => {
  it('serializa objeto como JSON', () => {
    setStorage('user', { id: 1, name: 'Maria' });
    expect(localStorage.getItem('user')).toBe('{"id":1,"name":"Maria"}');
  });

  it('serializa string', () => {
    setStorage('token', 'abc123');
    expect(localStorage.getItem('token')).toBe('"abc123"');
  });

  it('serializa array', () => {
    setStorage('items', [1, 2, 3]);
    expect(localStorage.getItem('items')).toBe('[1,2,3]');
  });
});

describe('getStorage', () => {
  it('retorna objeto deserializado', () => {
    localStorage.setItem('user', '{"id":1,"name":"Maria"}');
    expect(getStorage('user')).toEqual({ id: 1, name: 'Maria' });
  });

  it('retorna null quando chave ausente', () => {
    expect(getStorage('inexistente')).toBe(null);
  });

  it('retorna null quando JSON corrompido', () => {
    localStorage.setItem('corrompido', '{invalid json');
    expect(getStorage('corrompido')).toBe(null);
  });

  it('retorna string deserializada', () => {
    localStorage.setItem('token', '"abc123"');
    expect(getStorage('token')).toBe('abc123');
  });
});

describe('removeStorage', () => {
  it('remove a chave do storage', () => {
    localStorage.setItem('temp', '"valor"');
    removeStorage('temp');
    expect(localStorage.getItem('temp')).toBe(null);
  });

  it('nao falha quando chave nao existe', () => {
    expect(() => removeStorage('inexistente')).not.toThrow();
  });
});
