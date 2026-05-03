const Placeholder = () => (
  <main style={{ padding: 24, fontFamily: 'Inter, system-ui, sans-serif' }}>
    <h1 style={{ fontSize: 18, color: '#1a2332' }}>Módulo Colaborador</h1>
    <p style={{ fontSize: 14, color: '#64748b' }}>Em construção.</p>
  </main>
)

const colaboradorRoutes = [
  { path: '', element: <Placeholder /> },
  { path: 'login', element: <Placeholder /> }
]

export default colaboradorRoutes
