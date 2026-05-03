import { useRoutes } from 'react-router-dom'

import PhoneFrame from './components/PhoneFrame'
import { appRoutes } from './routes'

const App = () => {
  const element = useRoutes(appRoutes)
  return <PhoneFrame>{element}</PhoneFrame>
}

export default App
