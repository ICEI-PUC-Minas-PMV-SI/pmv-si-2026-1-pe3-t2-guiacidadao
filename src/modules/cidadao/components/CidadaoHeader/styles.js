import { colors, fonts } from '../../../../styles/theme'

export const styles = {
  bar: {
    height: 56,
    background: colors.white,
    borderBottom: `1.5px solid ${colors.primary}`,
    display: 'flex',
    alignItems: 'center',
    padding: '0 16px',
    flexShrink: 0
  },
  back: {
    width: 32,
    height: 32,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 22,
    color: colors.text,
    cursor: 'pointer',
    flexShrink: 0
  },
  brand: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6
  },
  logo: {
    width: 24,
    height: 24,
    objectFit: 'contain'
  },
  brandText: {
    fontFamily: fonts.display,
    fontWeight: 800,
    fontSize: 20,
    color: '#33475b',
    letterSpacing: '-0.2px'
  },
  spacer: {
    width: 32,
    flexShrink: 0
  }
}
