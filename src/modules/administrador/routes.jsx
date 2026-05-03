const Placeholder = () => (
  <main style={{ padding: 24, fontFamily: 'Inter, system-ui, sans-serif' }}>
    <h1 style={{ fontSize: 18, color: '#1a2332' }}>Módulo Administrador</h1>
    <p style={{ fontSize: 14, color: '#64748b' }}>Será implementado em fase futura.</p>
  </main>
)

const administradorRoutes = [{ path: '*', element: <Placeholder /> }]

export default administradorRoutes
