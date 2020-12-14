import { Switch, Route } from 'react-router-dom'

import EmpresaList from './EmpresaList'
import EmpresaForm from './EmpresaForm'

const Empresa = () => {

  return (
    <Switch>
      <Route path="/empresas/create">
        <EmpresaForm />
      </Route>
      <Route path="/">
        <EmpresaList />
      </Route>
    </Switch>
  )
}

export default Empresa