import { colors, fonts, radii, shadows } from '../../../../styles/theme'

export const styles = {
  shell: {
    minHeight: 844,
    background: colors.bg,
    position: 'relative',
    paddingBottom: 32
  },
  hero: {
    height: 200,
    background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
    color: colors.white,
    position: 'relative',
    overflow: 'hidden',
    padding: '60px 24px 0'
  },
  brand: {
    fontFamily: fonts.display,
    fontWeight: 800,
    fontSize: 26,
    color: colors.white
  },
  heroSub: {
    fontFamily: fonts.display,
    fontWeight: 400,
    fontSize: 15,
    color: 'rgba(255,255,255,0.9)',
    marginTop: 6
  },
  bubbleA: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.12)',
    right: -20,
    top: -40
  },
  bubbleB: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.15)',
    left: -20,
    top: 140
  },
  card: {
    position: 'relative',
    margin: '-30px 20px 0',
    background: colors.white,
    borderRadius: radii.card,
    boxShadow: shadows.modal,
    padding: 28,
    display: 'flex',
    flexDirection: 'column',
    gap: 18
  },
  title: {
    fontFamily: fonts.display,
    fontWeight: 700,
    fontSize: 20,
    color: colors.text
  },
  back: {
    display: 'block',
    margin: '20px auto 0',
    fontFamily: fonts.body,
    fontWeight: 600,
    fontSize: 13,
    color: colors.primary,
    textAlign: 'center',
    cursor: 'pointer'
  }
}
