import { colors, fonts, radii } from '../../../../styles/theme'

export const styles = {
  card: {
    flex: 1,
    minWidth: 0,
    background: colors.white,
    border: `1px solid ${colors.border}`,
    borderRadius: radii.md,
    padding: '12px 14px',
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    textAlign: 'left',
    cursor: 'pointer',
    transition: 'border-color 0.15s ease, box-shadow 0.15s ease, transform 0.05s ease'
  },
  cardActive: {
    borderColor: colors.primary,
    boxShadow: '0 2px 12px rgba(74, 110, 141, 0.18)'
  },
  value: {
    fontFamily: fonts.body,
    fontWeight: 700,
    fontSize: 24,
    color: colors.primary,
    lineHeight: 1
  },
  label: {
    fontFamily: fonts.body,
    fontWeight: 600,
    fontSize: 13,
    color: colors.text
  },
  hint: {
    fontFamily: fonts.body,
    fontSize: 11,
    color: colors.textMuted
  }
}
