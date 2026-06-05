import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'fs';

beforeAll(() => {
  globalThis.eval(readFileSync('src/js/colaborador/utils/escape.js', 'utf-8'));
  globalThis.eval(readFileSync('src/js/colaborador/components/icons.js', 'utf-8'));
  globalThis.eval(readFileSync('src/js/colaborador/components/bottom-nav.js', 'utf-8'));
});

describe('renderBottomNav', () => {
  it('renderiza nav com 4 itens', () => {
    const html = renderBottomNav();
    expect(html).toContain('<nav class="bottom-nav">');
    expect(html).toContain('>Inicio<');
    expect(html).toContain('>Beneficios<');
    expect(html).toContain('>Unidades<');
    expect(html).toContain('>Perfil<');
  });

  it('renderiza icones svg para cada item', () => {
    const html = renderBottomNav();
    const svgCount = (html.match(/<svg/g) || []).length;
    expect(svgCount).toBe(4);
  });

  it('marca item ativo com classe bottom-nav-item--active', () => {
    const html = renderBottomNav('beneficios');
    expect(html).toContain('class="bottom-nav-item bottom-nav-item--active"');
  });

  it('renderiza hrefs corretos para cada item', () => {
    const html = renderBottomNav();
    expect(html).toContain('href="/src/pages/colaborador/painel/painel.html"');
    expect(html).toContain('href="/src/pages/colaborador/beneficios/lista.html"');
    expect(html).toContain('href="/src/pages/colaborador/unidades/lista.html"');
    expect(html).toContain('href="/src/pages/colaborador/perfil/perfil.html"');
  });

  it('sem item ativo se activeKey nao fornecido', () => {
    const html = renderBottomNav();
    expect(html).not.toContain('bottom-nav-item--active');
  });
});
