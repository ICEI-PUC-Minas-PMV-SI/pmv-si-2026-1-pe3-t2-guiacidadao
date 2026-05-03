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
    <rect x="3" y="7" width="14" height="11" rx="1" stroke="currentColor" strokeWidth="1.5" />
    <path d="M3 11H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M10 7V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M10 7C8.5 4 5.5 4.8 6 6.5C6.5 8.5 10 7 10 7Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M10 7C11.5 4 14.5 4.8 14 6.5C13.5 8.5 10 7 10 7Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </>,
  size
)

export const IconDocumento = ({ size = 20 }) => wrap(
  <>
    <rect x="4" y="2" width="12" height="16" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    <line x1="6.5" y1="6.5" x2="13.5" y2="6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="6.5" y1="10" x2="13.5" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="6.5" y1="13.5" x2="11" y2="13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </>,
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
