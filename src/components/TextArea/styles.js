import { colors, fonts, radii, shadows } from '../../styles/theme'

export const styles = {
  group: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    width: '100%'
  },
  label: {
    fontFamily: fonts.body,
    fontWeight: 500,
    fontSize: 13,
    color: colors.textSubtle
  },
  field: {
    minHeight: 92,
    borderRadius: radii.lg,
    background: colors.bg,
    border: `1px solid ${colors.borderLight}`,
    boxShadow: shadows.card,
    padding: '12px 14px',
    fontFamily: fonts.body,
    fontSize: 15,
    color: colors.textDark,
    width: '100%',
    resize: 'vertical',
    lineHeight: 1.4
  },
  fieldFocus: {
    border: `1.5px solid ${colors.primary}`
  }
}
