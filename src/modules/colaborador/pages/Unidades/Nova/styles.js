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
  splitRow: {
    display: 'grid',
    gridTemplateColumns: '160px 1fr',
    gap: 10
  },
  benefitsBlock: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6
  },
  benefitsTitle: {
    fontFamily: fonts.body,
    fontWeight: 600,
    fontSize: 13,
    color: colors.text
  },
  benefitsHint: {
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
