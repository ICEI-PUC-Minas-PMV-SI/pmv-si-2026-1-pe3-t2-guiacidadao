import { colors, fonts, radii } from '../../styles/theme'

const base = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
  height: 30,
  padding: '0 10px',
  borderRadius: radii.pill,
  fontFamily: fonts.body,
  fontSize: 13,
  fontWeight: 500,
  whiteSpace: 'nowrap'
}

export const styles = {
  filled: {
    ...base,
    background: colors.primarySoft,
    color: colors.primary
  },
  outline: {
    ...base,
    background: colors.white,
    color: colors.text,
    border: `1px solid ${colors.border}`
  },
  ghost: {
    ...base,
    background: 'transparent',
    color: colors.primary,
    border: `1px dashed ${colors.primary}`,
    cursor: 'pointer'
  },
  remove: {
    color: colors.textMuted,
    cursor: 'pointer',
    fontSize: 16,
    lineHeight: 1
  }
}
