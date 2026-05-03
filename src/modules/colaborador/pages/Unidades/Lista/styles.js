import { colors, fonts } from '../../../../../styles/theme'

export const styles = {
  toolbar: {
    display: 'flex',
    gap: 10,
    alignItems: 'center'
  },
  filters: {
    display: 'flex',
    gap: 8,
    overflowX: 'auto',
    paddingBottom: 4
  },
  countRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline'
  },
  countLabel: {
    fontFamily: fonts.body,
    fontWeight: 600,
    fontSize: 13,
    color: colors.text
  },
  countTotal: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.textMuted
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10
  }
}
