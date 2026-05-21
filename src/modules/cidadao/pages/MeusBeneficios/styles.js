import { colors, fonts } from '../../../../styles/theme'

const cardShadow = '0 2px 8px rgba(0, 0, 0, 0.08)'
const gridColumns = '1.5fr 1fr 0.9fr'

export const styles = {
  shell: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%',
    background: colors.bg
  },
  body: {
    flex: 1,
    padding: '16px 16px 24px',
    display: 'flex',
    flexDirection: 'column'
  },
  pageTitle: {
    fontFamily: fonts.body,
    fontWeight: 500,
    fontSize: 22,
    color: colors.text,
    textAlign: 'center',
    margin: '4px 0 16px'
  },
  card: {
    background: colors.white,
    borderRadius: 14,
    boxShadow: cardShadow,
    padding: '14px 16px 8px',
    margin: '0 4px'
  },
  search: {
    width: '100%',
    height: 38,
    border: 'none',
    background: colors.primarySoft,
    borderRadius: 8,
    padding: '0 14px',
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.text,
    marginBottom: 14
  },
  tableHead: {
    display: 'grid',
    gridTemplateColumns: gridColumns,
    alignItems: 'center',
    padding: '6px 2px 8px',
    borderBottom: '1px solid #cbd5e1'
  },
  th: {
    fontFamily: fonts.body,
    fontWeight: 700,
    fontSize: 13,
    color: colors.text
  },
  row: {
    display: 'grid',
    gridTemplateColumns: gridColumns,
    alignItems: 'center',
    padding: '10px 2px',
    borderBottom: `1px solid ${colors.border}`
  },
  td: {
    fontFamily: fonts.body,
    fontWeight: 400,
    fontSize: 13,
    color: colors.text
  },
  tdAcoes: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    background: '#5cb85c',
    color: colors.white,
    fontFamily: fonts.body,
    fontWeight: 600,
    fontSize: 12,
    padding: '3px 12px',
    borderRadius: 999
  },
  iconBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 26,
    height: 26,
    fontSize: 16,
    cursor: 'pointer'
  },
  empty: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.textMuted,
    textAlign: 'center',
    padding: '16px 0'
  },
  novoBtn: {
    alignSelf: 'center',
    marginTop: 22,
    minWidth: 170,
    height: 42,
    padding: '0 18px',
    background: colors.primary,
    color: colors.white,
    fontFamily: fonts.body,
    fontWeight: 700,
    fontSize: 14,
    borderRadius: 8,
    cursor: 'pointer',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.18)'
  },
  salvarBtn: {
    marginTop: 'auto',
    height: 50,
    width: '100%',
    background: colors.primary,
    color: colors.white,
    fontFamily: fonts.body,
    fontWeight: 600,
    fontSize: 17,
    borderRadius: 10,
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.18)'
  }
}
