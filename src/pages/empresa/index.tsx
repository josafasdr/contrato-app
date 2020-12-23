import { createContext, useState } from 'react';
import { Switch, Route } from 'react-router-dom'

import EmpresaList from './EmpresaList'
import EmpresaEdit from './EmpresaEdit'

// Context responsável por compartilhar dados e configurações 
// da interface de Empresa
export const EmpresaContext = createContext<any | null>(null)

const Empresa = () => {
  const [empresa, setEmpresa] = useState<{data: any, openDialog: boolean}>({data: {}, openDialog: false})

  return (
    <EmpresaContext.Provider value={{ empresa, setEmpresa }}>
      <Switch>
        <Route path="/empresas/:id/detail">
          <EmpresaEdit />
        </Route>
        <Route path="/empresas/:id/edit">
          <EmpresaEdit />
        </Route>
        <Route path="/empresas/create">
          <EmpresaEdit />
        </Route>
        <Route path="/">
          <EmpresaList />
        </Route>
      </Switch>
    </EmpresaContext.Provider>
  )
}

export default Empresa