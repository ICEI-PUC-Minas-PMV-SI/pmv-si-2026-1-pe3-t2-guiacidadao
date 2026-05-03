import { colors, fonts, radii } from '../../../../styles/theme'

export const styles = {
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    minHeight: 60,
    flex: 1,
    background: colors.white,
    border: `1px solid ${colors.border}`,
    borderRadius: radii.md,
    padding: '0 14px',
    cursor: 'pointer',
    width: '100%',
    textAlign: 'left'
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: radii.sm,
    background: colors.primarySoft,
    color: colors.primary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 16,
    fontWeight: 700,
    flexShrink: 0
  },
  text: {
    flex: 1,
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: 2
  },
  title: {
    fontFamily: fonts.body,
    fontWeight: 600,
    fontSize: 14,
    color: colors.text
  },
  subtitle: {
    fontFamily: fonts.body,
    fontSize: 11,
    color: colors.textMuted
  },
  chevron: {
    fontSize: 18,
    color: colors.textMuted,
    flexShrink: 0
  }
}
