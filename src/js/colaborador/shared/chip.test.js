import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'fs';

beforeAll(() => {
  globalThis.eval(readFileSync('src/js/colaborador/utils/escape.js', 'utf-8'));
  globalThis.eval(readFileSync('src/js/colaborador/shared/chip.js', 'utf-8'));
});

describe('renderChip', () => {
  it('renderiza filled por padrao', () => {
    const html = renderChip({ children: 'RG' });
    expect(html).toContain('class="chip chip--filled"');
    expect(html).toContain('>RG');
  });

  it('renderiza outline', () => {
    const html = renderChip({ children: 'X', variant: 'outline' });
    expect(html).toContain('class="chip chip--outline"');
  });

  it('omite botao remove quando removeId nao fornecido', () => {
    const html = renderChip({ children: 'X' });
    expect(html).not.toContain('chip-remove');
  });

  it('renderiza botao remove com id quando fornecido', () => {
    const html = renderChip({ children: 'X', removeId: 'rm-1' });
    expect(html).toContain('class="chip-remove"');
    expect(html).toContain('id="rm-1"');
    expect(html).toContain('aria-label="Remover"');
  });

  it('escapa children e removeId', () => {
    const html = renderChip({ children: '<x>', removeId: '<y>' });
    expect(html).toContain('&lt;x&gt;');
    expect(html).toContain('id="&lt;y&gt;"');
  });
});
