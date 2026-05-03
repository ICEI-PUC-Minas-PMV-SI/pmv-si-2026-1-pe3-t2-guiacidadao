const outerBase = {
  background: '#f4f4f4',
  overflow: 'hidden',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column'
}

export const styles = {
  outerDesktop: {
    ...outerBase,
    width: 390,
    height: 844,
    boxShadow: '0 30px 60px rgba(0, 0, 0, 0.18)',
    borderRadius: 24
  },
  outerMobile: {
    ...outerBase,
    width: '100vw',
    height: '100vh',
    boxShadow: 'none',
    borderRadius: 0
  },
  scroll: {
    flex: 1,
    overflowY: 'auto',
    overflowX: 'hidden',
    position: 'relative',
    width: '100%',
    height: '100%'
  }
}
