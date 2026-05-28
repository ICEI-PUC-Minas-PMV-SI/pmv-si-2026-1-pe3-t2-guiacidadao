import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'fs';

beforeAll(() => {
  globalThis.eval(readFileSync('src/js/colaborador/utils/escape.js', 'utf-8'));
  globalThis.eval(readFileSync('src/js/colaborador/shared/search-bar.js', 'utf-8'));
});

describe('renderSearchBar', () => {
  it('renderiza container, input e icone svg', () => {
    const html = renderSearchBar({});
    expect(html).toContain('class="search-bar"');
    expect(html).toContain('class="search-input"');
    expect(html).toContain('class="search-icon"');
    expect(html).toContain('<svg');
  });

  it('usa placeholder padrao Buscar...', () => {
    const html = renderSearchBar({});
    expect(html).toContain('placeholder="Buscar..."');
  });

  it('aceita placeholder personalizado', () => {
    const html = renderSearchBar({ placeholder: 'Pesquisar beneficios' });
    expect(html).toContain('placeholder="Pesquisar beneficios"');
  });

  it('aplica value e id', () => {
    const html = renderSearchBar({ value: 'bpc', id: 'busca' });
    expect(html).toContain('value="bpc"');
    expect(html).toContain('id="busca"');
  });

  it('escapa value, placeholder e id', () => {
    const html = renderSearchBar({ value: '<x>', placeholder: '<y>', id: '<z>' });
    expect(html).toContain('value="&lt;x&gt;"');
    expect(html).toContain('placeholder="&lt;y&gt;"');
    expect(html).toContain('id="&lt;z&gt;"');
  });
});
