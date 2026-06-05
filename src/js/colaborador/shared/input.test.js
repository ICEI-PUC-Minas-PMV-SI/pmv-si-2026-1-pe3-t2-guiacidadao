import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'fs';

beforeAll(() => {
  globalThis.eval(readFileSync('src/js/colaborador/utils/escape.js', 'utf-8'));
  globalThis.eval(readFileSync('src/js/colaborador/shared/input.js', 'utf-8'));
});

describe('renderInput', () => {
  it('renderiza form-group com label e input', () => {
    const html = renderInput({ label: 'Nome', name: 'nome' });
    expect(html).toContain('class="form-group"');
    expect(html).toContain('class="form-label"');
    expect(html).toContain('>Nome<');
    expect(html).toContain('class="form-input"');
    expect(html).toContain('name="nome"');
  });

  it('marca asterisco quando required', () => {
    const html = renderInput({ label: 'Email', required: true });
    expect(html).toContain('Email *');
  });

  it('usa type text por padrao', () => {
    const html = renderInput({ label: 'X' });
    expect(html).toContain('type="text"');
  });

  it('aceita type personalizado', () => {
    const html = renderInput({ label: 'Senha', type: 'password' });
    expect(html).toContain('type="password"');
  });

  it('aplica value quando fornecido', () => {
    const html = renderInput({ label: 'X', value: 'Joao' });
    expect(html).toContain('value="Joao"');
  });

  it('aplica placeholder', () => {
    const html = renderInput({ label: 'X', placeholder: 'Digite...' });
    expect(html).toContain('placeholder="Digite..."');
  });

  it('renderiza hint quando fornecido', () => {
    const html = renderInput({ label: 'X', hint: 'Minimo 8 chars' });
    expect(html).toContain('Minimo 8 chars');
  });

  it('escapa valores potencialmente perigosos', () => {
    const html = renderInput({ label: '<x>', value: '<y>', placeholder: '<z>' });
    expect(html).toContain('&lt;x&gt;');
    expect(html).toContain('value="&lt;y&gt;"');
    expect(html).toContain('placeholder="&lt;z&gt;"');
  });

  it('aplica id ao input', () => {
    const html = renderInput({ label: 'X', id: 'input-nome' });
    expect(html).toContain('id="input-nome"');
  });
});
