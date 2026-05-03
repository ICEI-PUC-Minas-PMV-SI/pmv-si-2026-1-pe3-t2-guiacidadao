import { colors, fonts } from '../../../../styles/theme'

export const styles = {
  bar: {
    position: 'sticky',
    bottom: 0,
    height: 64,
    background: colors.white,
    borderTop: `1px solid ${colors.border}`,
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'space-around',
    flexShrink: 0,
    marginTop: 'auto'
  },
  item: (active) => ({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    color: active ? colors.primary : colors.navInactive,
    fontFamily: fonts.body,
    fontWeight: active ? 600 : 500,
    fontSize: 11,
    cursor: 'pointer'
  }),
  icon: {
    width: 20,
    height: 20
  }
}
