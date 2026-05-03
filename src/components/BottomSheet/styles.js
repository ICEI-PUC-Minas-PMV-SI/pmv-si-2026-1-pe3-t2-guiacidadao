import { colors, fonts, radii } from '../../styles/theme'

export const styles = {
  backdrop: {
    position: 'absolute',
    inset: 0,
    background: 'rgba(15, 23, 42, 0.4)',
    zIndex: 20
  },
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    background: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: '12px 0 16px',
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    maxHeight: '80%',
    zIndex: 21,
    boxShadow: '0 -10px 30px rgba(0,0,0,0.18)'
  },
  grabber: {
    width: 40,
    height: 4,
    borderRadius: 2,
    background: colors.border,
    margin: '0 auto 4px'
  },
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 24px'
  },
  title: {
    fontFamily: fonts.body,
    fontWeight: 700,
    fontSize: 17,
    color: colors.text
  },
  close: {
    width: 32,
    height: 32,
    borderRadius: radii.md,
    fontSize: 22,
    color: colors.textMuted
  },
  body: {
    flex: 1,
    overflowY: 'auto',
    padding: '0 16px'
  }
}
