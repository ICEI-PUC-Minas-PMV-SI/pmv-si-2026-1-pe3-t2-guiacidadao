import { colors, fonts, radii } from '../../styles/theme'

const palette = {
  ativo: { bg: colors.successSoft, fg: colors.successText },
  inativo: { bg: colors.inactiveSoft, fg: colors.inactiveText },
  pendente: { bg: colors.pendingSoft, fg: colors.pendingText },
  primario: { bg: colors.primarySoft, fg: colors.primary }
}

export const styles = {
  badge: (variant) => ({
    display: 'inline-flex',
    alignItems: 'center',
    height: 22,
    padding: '0 10px',
    borderRadius: radii.pill,
    background: palette[variant]?.bg ?? colors.inactiveSoft,
    color: palette[variant]?.fg ?? colors.inactiveText,
    fontFamily: fonts.body,
    fontSize: 11,
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: 0.4
  })
}
