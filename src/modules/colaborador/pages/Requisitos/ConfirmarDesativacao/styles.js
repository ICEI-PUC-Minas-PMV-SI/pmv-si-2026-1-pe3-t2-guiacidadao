import { colors, fonts } from '../../../../../styles/theme'

export const styles = {
  body: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 16,
    paddingTop: 8
  },
  title: {
    fontFamily: fonts.body,
    fontWeight: 700,
    fontSize: 19,
    color: colors.textDark,
    textAlign: 'center',
    lineHeight: 1.3
  },
  note: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.textSubtle,
    textAlign: 'center',
    lineHeight: 1.4
  },
  actions: {
    marginTop: 'auto',
    display: 'flex',
    gap: 12,
    paddingTop: 16,
    width: '100%'
  },
  cancel: {
    flex: 1
  },
  confirm: {
    flex: 1
  }
}
