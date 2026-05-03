import { colors, fonts, radii } from '../../../../../styles/theme'

export const styles = {
  shell: {
    minHeight: 844,
    background: 'rgba(15, 23, 42, 0.5)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },
  sheet: {
    background: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: '12px 0 16px',
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    minHeight: 600,
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
    color: colors.textMuted,
    cursor: 'pointer'
  },
  tabs: {
    display: 'flex',
    margin: '0 24px',
    borderBottom: `1px solid ${colors.border}`
  },
  tab: (active) => ({
    flex: 1,
    height: 40,
    fontFamily: fonts.body,
    fontWeight: active ? 700 : 500,
    fontSize: 14,
    color: active ? colors.primary : colors.textMuted,
    borderBottom: active ? `3px solid ${colors.primary}` : '3px solid transparent',
    cursor: 'pointer'
  }),
  search: {
    padding: '0 16px'
  },
  list: {
    flex: 1,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    padding: '0 16px'
  },
  row: (selected) => ({
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: radii.md,
    background: selected ? colors.primarySoft : colors.bg,
    border: `1px solid ${selected ? colors.primary : colors.border}`,
    cursor: 'pointer'
  }),
  check: (checked) => ({
    width: 20,
    height: 20,
    borderRadius: 4,
    background: checked ? colors.primary : colors.white,
    border: `1.5px solid ${checked ? colors.primary : colors.border}`,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: colors.white,
    fontSize: 14,
    fontWeight: 700,
    flexShrink: 0
  }),
  rowText: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.text
  },
  footer: {
    padding: '12px 16px 0'
  }
}
