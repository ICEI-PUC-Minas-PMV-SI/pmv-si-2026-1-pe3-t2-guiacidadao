import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'fs';

beforeAll(() => {
  globalThis.eval(readFileSync('src/js/colaborador/mocks/profile.js', 'utf-8'));
});

describe('MOCK_PROFILE', () => {
  it('expoe campos esperados', () => {
    expect(MOCK_PROFILE).toHaveProperty('id');
    expect(MOCK_PROFILE).toHaveProperty('fullName');
    expect(MOCK_PROFILE).toHaveProperty('email');
    expect(MOCK_PROFILE).toHaveProperty('initials');
    expect(MOCK_PROFILE).toHaveProperty('organization');
    expect(MOCK_PROFILE).toHaveProperty('role');
  });

  it('e exposto como global', () => {
    expect(globalThis.MOCK_PROFILE).toBeDefined();
  });
});
