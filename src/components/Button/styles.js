import { colors, fonts, radii, shadows } from '../../styles/theme'

const base = {
  height: 48,
  borderRadius: radii.xl,
  fontFamily: fonts.body,
  fontWeight: 700,
  fontSize: 15,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
  cursor: 'pointer',
  transition: 'transform 0.05s ease, opacity 0.15s ease',
  width: '100%'
}

export const styles = {
  primary: {
    ...base,
    background: colors.primary,
    color: colors.white,
    boxShadow: shadows.button
  },
  secondary: {
    ...base,
    background: colors.white,
    color: colors.primary,
    border: `1.5px solid ${colors.primary}`
  },
  ghost: {
    ...base,
    background: 'transparent',
    color: colors.primary
  },
  danger: {
    ...base,
    background: colors.danger,
    color: colors.white,
    boxShadow: shadows.button
  },
  dangerOutline: {
    ...base,
    background: colors.white,
    color: colors.danger,
    border: `1.5px solid ${colors.dangerSoft}`,
    height: 44
  },
  disabled: {
    opacity: 0.5,
    cursor: 'not-allowed'
  }
}
