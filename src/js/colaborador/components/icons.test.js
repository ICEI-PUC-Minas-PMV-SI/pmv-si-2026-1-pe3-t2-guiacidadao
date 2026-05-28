import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'fs';

beforeAll(() => {
  globalThis.eval(readFileSync('src/js/colaborador/components/icons.js', 'utf-8'));
});

describe('renderIcon', () => {
  const VALID = ['home', 'beneficio', 'documento', 'requisito', 'unidade', 'perfil'];

  it.each(VALID)('renderiza svg para %s', (name) => {
    const html = renderIcon(name);
    expect(html).toContain('<svg');
    expect(html).toContain('viewBox="0 0 20 20"');
    expect(html).toContain('width="20"');
    expect(html).toContain('height="20"');
  });

  it('aceita size personalizado', () => {
    const html = renderIcon('home', 32);
    expect(html).toContain('width="32"');
    expect(html).toContain('height="32"');
  });

  it('retorna svg vazio para nome invalido', () => {
    const html = renderIcon('inexistente');
    expect(html).toBe('');
  });
});
