import { Switch, Route } from 'react-router-dom'

import ContratoList from './ContratoList'
import ContratoForm from './ContratoForm'

const Contrato = () => {

  return (
    <Switch>
      <Route path="/contratos/create">
        <ContratoForm />
      </Route>
      <Route path="/">
        <ContratoList />
      </Route>
    </Switch>
  )
}

export default Contrato