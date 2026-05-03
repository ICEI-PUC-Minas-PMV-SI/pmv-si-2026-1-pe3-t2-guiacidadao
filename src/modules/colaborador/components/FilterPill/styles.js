import { colors, fonts, radii } from '../../../../styles/theme'

export const styles = {
  pill: (active) => ({
    height: 28,
    padding: '0 12px',
    borderRadius: radii.pill,
    background: active ? colors.primary : colors.white,
    color: active ? colors.white : colors.text,
    border: `1px solid ${active ? colors.primary : colors.border}`,
    fontFamily: fonts.body,
    fontSize: 12,
    fontWeight: 500,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    flexShrink: 0
  })
}
