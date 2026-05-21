import { colors, fonts } from '../../../../styles/theme'

const cardShadow = '0 2px 8px rgba(0, 0, 0, 0.08)'

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
  resumoCard: {
    background: colors.white,
    borderRadius: 14,
    boxShadow: cardShadow,
    padding: '14px 20px',
    margin: '0 6px'
  },
  cardTitle: {
    fontFamily: fonts.body,
    fontWeight: 700,
    fontSize: 16,
    color: colors.text,
    textAlign: 'center',
    margin: '0 0 6px'
  },
  infoLine: {
    fontFamily: fonts.body,
    fontWeight: 400,
    fontSize: 14,
    color: colors.text,
    lineHeight: 1.6,
    margin: '2px 0'
  },
  infoLabel: {
    fontWeight: 700
  },
  sectionTitle: {
    fontFamily: fonts.body,
    fontWeight: 500,
    fontSize: 20,
    color: colors.text,
    textAlign: 'center',
    margin: '18px 0 10px'
  },
  membrosBox: {
    border: '2px dashed #a435c8',
    borderRadius: 12,
    padding: 14,
    display: 'flex',
    flexDirection: 'column',
    gap: 14
  },
  memberCard: {
    background: colors.white,
    borderRadius: 12,
    boxShadow: cardShadow,
    padding: '14px 20px',
    display: 'flex',
    flexDirection: 'column'
  },
  memberName: {
    fontFamily: fonts.body,
    fontWeight: 700,
    fontSize: 16,
    color: colors.text,
    textAlign: 'center',
    margin: '0 0 6px'
  },
  editBtn: {
    alignSelf: 'center',
    marginTop: 12,
    width: 160,
    height: 40,
    background: colors.primary,
    color: colors.white,
    fontFamily: fonts.body,
    fontWeight: 600,
    fontSize: 15,
    borderRadius: 8,
    cursor: 'pointer',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)'
  },
  addBtn: {
    marginTop: 16,
    height: 50,
    width: '100%',
    background: colors.primary,
    color: colors.white,
    fontFamily: fonts.body,
    fontWeight: 600,
    fontSize: 16,
    borderRadius: 10,
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.18)'
  }
}
