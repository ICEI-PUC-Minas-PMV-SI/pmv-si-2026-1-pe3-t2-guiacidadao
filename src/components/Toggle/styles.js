import { colors } from '../../styles/theme'

export const styles = {
  track: (active) => ({
    width: 48,
    height: 28,
    background: active ? colors.primary : colors.border,
    borderRadius: 999,
    position: 'relative',
    cursor: 'pointer',
    transition: 'background 0.2s ease',
    flexShrink: 0
  }),
  thumb: (active) => ({
    width: 22,
    height: 22,
    background: colors.white,
    borderRadius: '50%',
    position: 'absolute',
    top: 3,
    left: active ? 23 : 3,
    transition: 'left 0.2s ease',
    boxShadow: '0 1px 4px rgba(0,0,0,0.2)'
  })
}
