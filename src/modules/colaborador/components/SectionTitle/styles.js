import { colors, fonts } from '../../../../styles/theme'

export const styles = {
  row: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    gap: 8
  },
  title: {
    fontFamily: fonts.body,
    fontWeight: 600,
    fontSize: 14,
    color: colors.text
  },
  hint: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.textMuted
  }
}
