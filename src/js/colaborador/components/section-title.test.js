import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'fs';

beforeAll(() => {
  globalThis.eval(readFileSync('src/js/colaborador/utils/escape.js', 'utf-8'));
  globalThis.eval(readFileSync('src/js/colaborador/components/section-title.js', 'utf-8'));
});

describe('renderSectionTitle', () => {
  it('renderiza h2 com children', () => {
    const html = renderSectionTitle({ children: 'Beneficios' });
    expect(html).toContain('class="section-title-row"');
    expect(html).toContain('<h2 class="section-title">');
    expect(html).toContain('>Beneficios<');
  });

  it('renderiza hint quando fornecido', () => {
    const html = renderSectionTitle({ children: 'X', hint: '5 itens' });
    expect(html).toContain('class="section-title-hint"');
    expect(html).toContain('>5 itens<');
  });

  it('omite hint quando ausente', () => {
    const html = renderSectionTitle({ children: 'X' });
    expect(html).not.toContain('section-title-hint');
  });

  it('escapa children e hint', () => {
    const html = renderSectionTitle({ children: '<x>', hint: '<y>' });
    expect(html).toContain('&lt;x&gt;');
    expect(html).toContain('&lt;y&gt;');
  });
});
