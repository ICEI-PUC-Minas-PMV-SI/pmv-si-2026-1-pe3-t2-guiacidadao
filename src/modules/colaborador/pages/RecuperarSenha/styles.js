import { colors, fonts } from '../../../../styles/theme'

export const styles = {
  intro: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6
  },
  title: {
    fontFamily: fonts.body,
    fontWeight: 700,
    fontSize: 17,
    color: colors.text
  },
  message: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.textMuted,
    lineHeight: 1.4
  },
  actions: {
    marginTop: 'auto',
    display: 'flex',
    gap: 12,
    paddingTop: 16
  },
  cancelBtn: {
    width: 110
  },
  primaryBtn: {
    flex: 1
  }
}
