import { colors } from '../../styles/theme'

const palette = {
  warning: { bg: colors.warningSoft, fg: colors.warning },
  danger: { bg: colors.dangerSoft, fg: colors.danger },
  success: { bg: colors.successSoft, fg: colors.success }
}

export const styles = {
  circle: (variant) => ({
    width: 80,
    height: 80,
    borderRadius: '50%',
    background: palette[variant]?.bg ?? colors.warningSoft,
    color: palette[variant]?.fg ?? colors.warning,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto'
  }),
  glyph: {
    fontSize: 36,
    fontWeight: 700,
    lineHeight: 1
  }
}
