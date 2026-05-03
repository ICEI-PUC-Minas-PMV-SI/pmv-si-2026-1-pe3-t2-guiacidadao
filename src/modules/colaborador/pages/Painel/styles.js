import { colors, fonts } from '../../../../styles/theme'

export const styles = {
  greeting: {
    fontFamily: fonts.body,
    fontWeight: 700,
    fontSize: 18,
    color: colors.text
  },
  subtitle: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 4
  },
  introBlock: {
    display: 'flex',
    flexDirection: 'column'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 12
  },
  menuList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    flex: 1
  },
  iconList: {
    display: 'inline-flex',
    flexDirection: 'column',
    gap: 2
  },
  iconBar: {
    width: 14,
    height: 2,
    background: colors.primary,
    borderRadius: 1
  }
}
