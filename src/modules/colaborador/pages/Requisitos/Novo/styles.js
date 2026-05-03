import { colors, fonts } from '../../../../../styles/theme'

export const styles = {
  hint: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.textMuted,
    textAlign: 'right'
  },
  fields: {
    display: 'flex',
    flexDirection: 'column',
    gap: 14
  },
  paramBlock: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6
  },
  paramTitle: {
    fontFamily: fonts.body,
    fontWeight: 600,
    fontSize: 13,
    color: colors.text
  },
  paramHint: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.textMuted,
    lineHeight: 1.4
  },
  paramRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 10
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
