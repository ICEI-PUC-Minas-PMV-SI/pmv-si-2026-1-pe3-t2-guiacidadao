import { colors, fonts } from '../../../../styles/theme'

export const styles = {
  fields: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12
  },
  rules: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.textMuted
  },
  rulesTitle: {
    fontWeight: 600,
    color: colors.text,
    marginBottom: 4
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
