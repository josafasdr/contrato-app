import { createContext } from 'react';
import { Switch, Route } from 'react-router-dom'

import EmpresaList from './EmpresaList'
import EmpresaEdit from './EmpresaEdit'

export const EmpresaContext = createContext<any | null>(null)

const Empresa = () => {

  return (
    <Switch>
      <Route path="/empresas/create">
        <EmpresaEdit />
      </Route>
      <Route path="/">
        <EmpresaList />
      </Route>
    </Switch>
  )
}

export default Empresa