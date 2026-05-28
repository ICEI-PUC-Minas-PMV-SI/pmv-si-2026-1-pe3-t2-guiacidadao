import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'fs';

beforeAll(() => {
  globalThis.eval(readFileSync('src/js/colaborador/utils/escape.js', 'utf-8'));
  globalThis.eval(readFileSync('src/js/colaborador/shared/impact-box.js', 'utf-8'));
});

describe('renderImpactBox', () => {
  it('renderiza section com title e ul', () => {
    const html = renderImpactBox({ title: 'O que muda', items: ['Item 1', 'Item 2'] });
    expect(html).toContain('class="impact-box"');
    expect(html).toContain('class="impact-box-title"');
    expect(html).toContain('>O que muda<');
    expect(html).toContain('<ul class="impact-box-list">');
    expect(html).toContain('<li>Item 1</li>');
    expect(html).toContain('<li>Item 2</li>');
  });

  it('usa title padrao quando ausente', () => {
    const html = renderImpactBox({ items: [] });
    expect(html).toContain('>O que muda<');
  });

  it('aceita items vazio', () => {
    const html = renderImpactBox({ items: [] });
    expect(html).toContain('<ul class="impact-box-list"></ul>');
  });

  it('escapa title e items', () => {
    const html = renderImpactBox({ title: '<x>', items: ['<y>', '<z>'] });
    expect(html).toContain('&lt;x&gt;');
    expect(html).toContain('<li>&lt;y&gt;</li>');
    expect(html).toContain('<li>&lt;z&gt;</li>');
  });
});
