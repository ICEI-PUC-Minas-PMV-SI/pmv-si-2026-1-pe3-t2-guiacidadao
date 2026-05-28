import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'fs';

beforeAll(() => {
  globalThis.eval(readFileSync('src/js/colaborador/utils/escape.js', 'utf-8'));
  globalThis.eval(readFileSync('src/js/colaborador/shared/bottom-sheet.js', 'utf-8'));
});

describe('renderBottomSheet', () => {
  it('renderiza backdrop e sheet', () => {
    const html = renderBottomSheet({ title: 'Editar', body: '<p>Form</p>' });
    expect(html).toContain('class="bottom-sheet-backdrop"');
    expect(html).toContain('class="bottom-sheet"');
    expect(html).toContain('class="bottom-sheet-grabber"');
    expect(html).toContain('class="bottom-sheet-title"');
    expect(html).toContain('class="bottom-sheet-body"');
  });

  it('renderiza title escapado', () => {
    const html = renderBottomSheet({ title: '<x>', body: '' });
    expect(html).toContain('>&lt;x&gt;<');
  });

  it('renderiza body sem escapar (HTML composto)', () => {
    const html = renderBottomSheet({ title: 'X', body: '<p class="x">conteudo</p>' });
    expect(html).toContain('<p class="x">conteudo</p>');
  });

  it('aplica closeId no botao de fechar', () => {
    const html = renderBottomSheet({ title: 'X', body: '', closeId: 'btn-fechar' });
    expect(html).toContain('id="btn-fechar"');
    expect(html).toContain('class="bottom-sheet-close"');
    expect(html).toContain('aria-label="Fechar"');
  });

  it('aplica backdropId', () => {
    const html = renderBottomSheet({ title: 'X', body: '', backdropId: 'bd' });
    expect(html).toContain('id="bd"');
  });
});
