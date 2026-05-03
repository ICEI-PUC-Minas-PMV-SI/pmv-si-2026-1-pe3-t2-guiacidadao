import { colors, fonts } from '../../../../styles/theme'

export const styles = {
  intro: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6
  },
  greeting: {
    fontFamily: fonts.body,
    fontWeight: 700,
    fontSize: 18,
    color: colors.textDark
  },
  message: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.textMuted,
    lineHeight: 1.4
  },
  rules: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.textSubtle
  },
  rulesTitle: {
    fontWeight: 600,
    color: colors.text,
    marginBottom: 4
  },
  actions: {
    marginTop: 'auto',
    display: 'flex',
    gap: 12,
    paddingTop: 16
  }
}
