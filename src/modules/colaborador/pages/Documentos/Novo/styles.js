import { colors, fonts } from '../../../../../styles/theme'

export const styles = {
  hint: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.textSubtle,
    textAlign: 'right'
  },
  fields: {
    display: 'flex',
    flexDirection: 'column',
    gap: 14
  },
  togglerRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12
  },
  togglerBlock: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4
  },
  togglerTitle: {
    fontFamily: fonts.body,
    fontWeight: 600,
    fontSize: 14,
    color: colors.text
  },
  togglerHint: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.textMuted,
    lineHeight: 1.4
  },
  actions: {
    marginTop: 'auto',
    display: 'flex',
    gap: 12,
    paddingTop: 16
  },
  cancel: {
    width: 110
  },
  save: {
    flex: 1
  }
}
