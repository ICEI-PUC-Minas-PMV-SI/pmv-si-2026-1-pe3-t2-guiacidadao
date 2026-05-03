import { colors, radii } from '../../../../styles/theme'

export const styles = {
  btn: {
    width: 40,
    height: 40,
    borderRadius: radii.md,
    background: colors.primary,
    color: colors.white,
    fontSize: 22,
    fontWeight: 700,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    flexShrink: 0
  }
}
