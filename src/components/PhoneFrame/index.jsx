import { useEffect, useState } from 'react'

import { styles } from './styles'

const MOBILE_QUERY = '(max-width: 480px)'

const PhoneFrame = ({ children }) => {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(MOBILE_QUERY).matches
  )

  useEffect(() => {
    const mql = window.matchMedia(MOBILE_QUERY)
    const handler = (event) => setIsMobile(event.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])

  return (
    <div style={isMobile ? styles.outerMobile : styles.outerDesktop}>
      <div style={styles.scroll}>{children}</div>
    </div>
  )
}

export default PhoneFrame
