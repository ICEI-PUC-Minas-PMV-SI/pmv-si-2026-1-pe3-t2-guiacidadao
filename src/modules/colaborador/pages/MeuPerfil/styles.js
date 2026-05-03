import { colors, fonts } from '../../../../styles/theme'

export const styles = {
  identity: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 6
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: '50%',
    background: colors.primarySoft,
    color: colors.primary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: fonts.body,
    fontWeight: 700,
    fontSize: 22
  },
  name: {
    fontFamily: fonts.body,
    fontWeight: 700,
    fontSize: 18,
    color: colors.textDark
  },
  role: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.textSubtle
  },
  fields: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12
  },
  passwordBtn: {
    marginTop: 8
  },
  exitBtn: {
    marginTop: 8
  },
  actions: {
    display: 'flex',
    gap: 12,
    marginTop: 12
  },
  cancel: {
    width: 110
  },
  save: {
    flex: 1
  }
}
