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
  statusRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12
  },
  statusBlock: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2
  },
  statusLabel: {
    fontFamily: fonts.body,
    fontWeight: 600,
    fontSize: 13,
    color: colors.text
  },
  statusHint: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.textMuted
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
