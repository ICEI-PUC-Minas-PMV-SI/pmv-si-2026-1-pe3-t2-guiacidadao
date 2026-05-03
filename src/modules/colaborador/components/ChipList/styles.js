import { colors, fonts } from '../../../../styles/theme'

export const styles = {
  group: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8
  },
  labelRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline'
  },
  label: {
    fontFamily: fonts.body,
    fontWeight: 600,
    fontSize: 13,
    color: colors.text
  },
  hint: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.textMuted
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8
  },
  empty: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.textMuted,
    fontStyle: 'italic'
  }
}
