import { colors, fonts } from '../../../../../styles/theme'

export const styles = {
  topRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  editLink: {
    fontFamily: fonts.body,
    fontWeight: 600,
    fontSize: 13,
    color: colors.primary,
    cursor: 'pointer'
  },
  block: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4
  },
  fieldLabel: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5
  },
  fieldValue: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.text,
    lineHeight: 1.4
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.text
  },
  link: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.primary,
    wordBreak: 'break-all'
  },
  meta: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.textSubtle
  }
}
