import { colors, fonts, radii } from '../../styles/theme'

export const styles = {
  box: {
    background: colors.warningSoft,
    border: `1px solid ${colors.warning}33`,
    borderRadius: radii.md,
    padding: '14px 16px',
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    width: '100%'
  },
  title: {
    fontFamily: fonts.body,
    fontWeight: 600,
    fontSize: 14,
    color: colors.warningText
  },
  list: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.warningText,
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    margin: 0
  }
}
