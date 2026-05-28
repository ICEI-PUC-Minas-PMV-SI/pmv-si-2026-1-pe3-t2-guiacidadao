import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'fs';

beforeAll(() => {
  globalThis.eval(readFileSync('src/js/colaborador/mocks/requisitos.js', 'utf-8'));
});

describe('MOCK_REQUISITOS', () => {
  it('expoe array com 5 items', () => {
    expect(MOCK_REQUISITOS).toHaveLength(5);
  });

  it('cada item tem id e name', () => {
    MOCK_REQUISITOS.forEach((item) => {
      expect(item).toHaveProperty('id');
      expect(item).toHaveProperty('name');
      expect(item).toHaveProperty('category');
    });
  });
});
