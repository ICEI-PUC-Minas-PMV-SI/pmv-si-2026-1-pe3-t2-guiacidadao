import { colors, fonts, radii } from '../../../../styles/theme'

export const styles = {
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    minHeight: 60,
    background: colors.white,
    border: `1px solid ${colors.border}`,
    borderRadius: radii.md,
    padding: '10px 14px',
    cursor: 'pointer',
    width: '100%',
    textAlign: 'left'
  },
  text: {
    flex: 1,
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: 2
  },
  title: {
    fontFamily: fonts.body,
    fontWeight: 600,
    fontSize: 14,
    color: colors.text,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  subtitle: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.textMuted,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  rightCol: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    flexShrink: 0
  }
}
