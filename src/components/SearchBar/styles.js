import { colors, fonts, radii } from '../../styles/theme'

export const styles = {
  wrap: {
    flex: 1,
    height: 40,
    borderRadius: radii.md,
    background: colors.white,
    border: `1px solid ${colors.border}`,
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '0 12px'
  },
  icon: {
    width: 16,
    height: 16,
    color: colors.textMuted,
    flexShrink: 0
  },
  input: {
    flex: 1,
    border: 'none',
    background: 'transparent',
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.text
  }
}
