import { colors, fonts, radii } from '../../styles/theme'

const palette = {
  ativo: { bg: colors.successSoft, fg: colors.success },
  inativo: { bg: colors.bg, fg: colors.textMuted },
  pendente: { bg: colors.warningSoft, fg: colors.warning },
  primario: { bg: colors.primarySoft, fg: colors.primary }
}

export const styles = {
  badge: (variant) => ({
    display: 'inline-flex',
    alignItems: 'center',
    height: 22,
    padding: '0 10px',
    borderRadius: radii.pill,
    background: palette[variant]?.bg ?? colors.bg,
    color: palette[variant]?.fg ?? colors.textMuted,
    fontFamily: fonts.body,
    fontSize: 11,
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: 0.4
  })
}
