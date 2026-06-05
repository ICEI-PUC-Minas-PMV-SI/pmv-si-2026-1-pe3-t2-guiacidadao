import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'fs';

beforeAll(() => {
  globalThis.eval(readFileSync('src/js/colaborador/utils/escape.js', 'utf-8'));
  globalThis.eval(readFileSync('src/js/colaborador/shared/button.js', 'utf-8'));
});

describe('renderButton', () => {
  it('renderiza com variant primary por padrao', () => {
    const html = renderButton({ children: 'Salvar' });
    expect(html).toContain('class="btn btn-primary"');
    expect(html).toContain('>Salvar<');
    expect(html).toContain('type="button"');
  });

  it('aceita variant outline', () => {
    const html = renderButton({ children: 'Cancelar', variant: 'outline' });
    expect(html).toContain('class="btn btn-outline"');
  });

  it('aceita variant danger', () => {
    const html = renderButton({ children: 'Excluir', variant: 'danger' });
    expect(html).toContain('class="btn btn-danger"');
  });

  it('aceita variant link', () => {
    const html = renderButton({ children: 'Mais info', variant: 'link' });
    expect(html).toContain('class="btn-link"');
  });

  it('aplica id quando fornecido', () => {
    const html = renderButton({ children: 'X', id: 'btn-salvar' });
    expect(html).toContain('id="btn-salvar"');
  });

  it('aplica type submit', () => {
    const html = renderButton({ children: 'X', type: 'submit' });
    expect(html).toContain('type="submit"');
  });

  it('aplica disabled', () => {
    const html = renderButton({ children: 'X', disabled: true });
    expect(html).toContain('disabled');
  });

  it('escapa children', () => {
    const html = renderButton({ children: '<script>' });
    expect(html).toContain('&lt;script&gt;');
    expect(html).not.toContain('<script>');
  });
});
