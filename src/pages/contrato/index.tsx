import { Switch, Route } from 'react-router-dom'
import { createContext } from 'react';

import ContratoList from './ContratoList'
import ContratoEdit from './ContratoEdit';

export const ContratoContext = createContext<any | null>(null)

const Contrato = () => {

  return (
    <Switch>
      <Route path="/contratos/create">
        <ContratoEdit />
      </Route>
      <Route path="/contratos/:id/edit">
        <ContratoEdit />
      </Route>
      <Route path="/">
        <ContratoList />
      </Route>
    </Switch>
  )
}

export default Contrato