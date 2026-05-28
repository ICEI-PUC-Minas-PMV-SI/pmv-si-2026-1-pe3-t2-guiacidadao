import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'fs';

beforeAll(() => {
  globalThis.eval(readFileSync('src/js/colaborador/mocks/documentos.js', 'utf-8'));
});

describe('MOCK_DOCUMENTOS', () => {
  it('expoe array com 5 items', () => {
    expect(MOCK_DOCUMENTOS).toHaveLength(5);
  });

  it('cada item tem id e name', () => {
    MOCK_DOCUMENTOS.forEach((item) => {
      expect(item).toHaveProperty('id');
      expect(item).toHaveProperty('name');
      expect(item).toHaveProperty('category');
    });
  });
});
