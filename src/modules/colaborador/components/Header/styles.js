import { colors, fonts } from '../../../../styles/theme'

export const styles = {
  bar: {
    height: 72,
    background: colors.primary,
    color: colors.white,
    display: 'flex',
    alignItems: 'center',
    padding: '0 20px',
    gap: 12,
    flexShrink: 0
  },
  back: {
    color: colors.white,
    fontSize: 22,
    width: 32,
    height: 32,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    flexShrink: 0
  },
  titleBlock: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    minWidth: 0
  },
  title: {
    fontFamily: fonts.body,
    fontWeight: 700,
    fontSize: 17,
    color: colors.white,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  subtitle: {
    fontFamily: fonts.body,
    fontWeight: 500,
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)'
  },
  hero: {
    height: 100,
    background: colors.primary,
    color: colors.white,
    padding: '20px 24px',
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    flexShrink: 0
  },
  brand: {
    fontFamily: fonts.body,
    fontWeight: 700,
    fontSize: 20
  },
  brandSub: {
    fontFamily: fonts.body,
    fontWeight: 500,
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)'
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.25)',
    color: colors.white,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: fonts.body,
    fontWeight: 700,
    fontSize: 15,
    marginLeft: 'auto'
  },
  heroRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 12
  }
}
