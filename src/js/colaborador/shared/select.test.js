import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'fs';

beforeAll(() => {
  globalThis.eval(readFileSync('src/js/colaborador/utils/escape.js', 'utf-8'));
  globalThis.eval(readFileSync('src/js/colaborador/shared/select.js', 'utf-8'));
});

describe('renderSelect', () => {
  const options = [
    { value: 'a', label: 'Opcao A' },
    { value: 'b', label: 'Opcao B' }
  ];

  it('renderiza form-group com label, wrapper e select', () => {
    const html = renderSelect({ label: 'Tipo', options });
    expect(html).toContain('class="form-group"');
    expect(html).toContain('>Tipo<');
    expect(html).toContain('class="form-select-wrapper"');
    expect(html).toContain('<select');
    expect(html).toContain('class="form-input"');
  });

  it('renderiza todas as options', () => {
    const html = renderSelect({ label: 'X', options });
    expect(html).toContain('value="a"');
    expect(html).toContain('>Opcao A<');
    expect(html).toContain('value="b"');
    expect(html).toContain('>Opcao B<');
  });

  it('renderiza placeholder como option vazia quando fornecido', () => {
    const html = renderSelect({ label: 'X', options, placeholder: 'Selecione...' });
    expect(html).toContain('value=""');
    expect(html).toContain('>Selecione...<');
  });

  it('marca option como selected quando value bate', () => {
    const html = renderSelect({ label: 'X', options, value: 'b' });
    expect(html).toContain('value="b" selected');
  });

  it('renderiza setinha de chevron', () => {
    const html = renderSelect({ label: 'X', options });
    expect(html).toContain('class="form-select-arrow"');
    expect(html).toContain('<svg');
  });

  it('escapa labels e values', () => {
    const html = renderSelect({ label: '<x>', options: [{ value: '<v>', label: '<l>' }] });
    expect(html).toContain('&lt;x&gt;');
    expect(html).toContain('value="&lt;v&gt;"');
    expect(html).toContain('>&lt;l&gt;<');
  });
});
