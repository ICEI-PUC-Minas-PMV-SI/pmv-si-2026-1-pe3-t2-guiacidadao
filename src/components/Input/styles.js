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
    height: 48,
    borderRadius: radii.lg,
    background: colors.white,
    border: `1px solid ${colors.borderLight}`,
    boxShadow: shadows.card,
    padding: '0 14px',
    fontFamily: fonts.body,
    fontSize: 15,
    color: colors.textDark,
    width: '100%'
  },
  fieldFocus: {
    border: `1.5px solid ${colors.primary}`
  },
  hint: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.textSubtle
  },
  helperRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  helperLink: {
    fontFamily: fonts.body,
    fontWeight: 500,
    fontSize: 12,
    color: colors.primary,
    cursor: 'pointer'
  }
}
