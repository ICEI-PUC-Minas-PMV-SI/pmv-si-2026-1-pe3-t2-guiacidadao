import { colors, fonts, radii } from '../../../../../styles/theme'

export const styles = {
  topRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8
  },
  editingPill: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    height: 26,
    padding: '0 12px',
    borderRadius: radii.pill,
    background: colors.primarySoft,
    color: colors.primary,
    fontFamily: fonts.body,
    fontWeight: 600,
    fontSize: 12
  },
  hint: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.textMuted
  },
  fields: {
    display: 'flex',
    flexDirection: 'column',
    gap: 14
  },
  actionsTop: {
    display: 'flex',
    gap: 12,
    paddingTop: 8
  },
  cancel: {
    width: 110
  },
  save: {
    flex: 1
  },
  disable: {
    marginTop: 8
  }
}
