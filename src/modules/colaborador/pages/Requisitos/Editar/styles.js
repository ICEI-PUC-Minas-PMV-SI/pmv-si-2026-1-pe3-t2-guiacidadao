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
  paramRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 10
  },
  actionsTop: {
    display: 'flex',
    gap: 12,
    paddingTop: 8
  },
  cancel: {
    width: 110
  },
  save: {
    flex: 1
  },
  disable: {
    marginTop: 8
  }
}
