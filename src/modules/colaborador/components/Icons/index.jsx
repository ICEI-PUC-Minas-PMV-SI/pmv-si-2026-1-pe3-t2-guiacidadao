const wrap = (children, size) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    {children}
  </svg>
)

export const IconHome = ({ size = 20 }) => wrap(
  <path d="M3 10L10 4L17 10V16C17 16.55 16.55 17 16 17H12V12H8V17H4C3.45 17 3 16.55 3 16V10Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />,
  size
)

export const IconBeneficio = ({ size = 20 }) => wrap(
  <>
    <rect x="2" y="4" width="16" height="2" rx="1" fill="currentColor" />
    <rect x="2" y="9" width="16" height="2" rx="1" fill="currentColor" />
    <rect x="2" y="14" width="16" height="2" rx="1" fill="currentColor" />
  </>,
  size
)

export const IconDocumento = ({ size = 20 }) => wrap(
  <path
    d="M3 6 H8.5 L10.5 8 H17 Q18 8 18 9 V16 Q18 17 17 17 H3 Q2 17 2 16 V7 Q2 6 3 6 Z"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinejoin="round"
  />,
  size
)

export const IconRequisito = ({ size = 20 }) => wrap(
  <>
    <rect x="3" y="3" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M6.5 10.5L9 13L13.5 7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </>,
  size
)

export const IconUnidade = ({ size = 20 }) => wrap(
  <>
    <path d="M10 18C10 18 16 11.5 16 7C16 3.69 13.31 1 10 1C6.69 1 4 3.69 4 7C4 11.5 10 18 10 18Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <circle cx="10" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.5" />
  </>,
  size
)

export const IconPerfil = ({ size = 20 }) => wrap(
  <>
    <circle cx="10" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" />
    <path d="M3 17C3 13.69 6.13 11 10 11C13.87 11 17 13.69 17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </>,
  size
)
