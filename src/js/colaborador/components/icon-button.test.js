import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'fs';

beforeAll(() => {
  globalThis.eval(readFileSync('src/js/colaborador/utils/escape.js', 'utf-8'));
  globalThis.eval(readFileSync('src/js/colaborador/components/icon-button.js', 'utf-8'));
});

describe('renderIconButton', () => {
  it('renderiza button type button com classe icon-button', () => {
    const html = renderIconButton({ children: '+', ariaLabel: 'Adicionar' });
    expect(html).toContain('<button');
    expect(html).toContain('type="button"');
    expect(html).toContain('class="icon-button"');
  });

  it('aplica aria-label', () => {
    const html = renderIconButton({ children: '+', ariaLabel: 'Novo item' });
    expect(html).toContain('aria-label="Novo item"');
  });

  it('aplica id quando fornecido', () => {
    const html = renderIconButton({ children: '+', ariaLabel: 'X', id: 'btn-add' });
    expect(html).toContain('id="btn-add"');
  });

  it('renderiza children inline (sem escapar)', () => {
    const html = renderIconButton({ children: '<svg></svg>', ariaLabel: 'X' });
    expect(html).toContain('<svg></svg>');
  });

  it('escapa aria-label e id', () => {
    const html = renderIconButton({ children: '+', ariaLabel: '<x>', id: '<y>' });
    expect(html).toContain('aria-label="&lt;x&gt;"');
    expect(html).toContain('id="&lt;y&gt;"');
  });
});
