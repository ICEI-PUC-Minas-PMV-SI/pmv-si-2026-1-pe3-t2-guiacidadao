import { colors, fonts, radii, shadows } from '../../styles/theme'

export const styles = {
  group: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    width: '100%'
  },
  label: {
    fontFamily: fonts.body,
    fontWeight: 500,
    fontSize: 13,
    color: colors.textSubtle
  },
  field: {
    height: 48,
    borderRadius: radii.lg,
    background: colors.white,
    border: `1px solid ${colors.borderLight}`,
    boxShadow: shadows.card,
    padding: '0 14px',
    fontFamily: fonts.body,
    fontSize: 15,
    color: colors.textDark,
    width: '100%',
    appearance: 'none',
    backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'><path d='M1 1.5L6 6.5L11 1.5' stroke='%2364748b' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/></svg>")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 14px center'
  }
}
