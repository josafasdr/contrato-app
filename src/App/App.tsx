import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import { CssBaseline, makeStyles } from '@material-ui/core'

import './App.css'
import Home from '../pages/Home'
import Header from '../components/Header'
import SideMenu from '../components/SideMenu'
import Contrato from '../pages/contrato'
import Empresa from '../pages/empresa'

const useStyles = makeStyles((theme) => ({
  content: {
    marginTop: '48px',
    marginLeft: '10px',
    [theme.breakpoints.up('sm')]: {
      marginLeft: '260px',
      marginTop: '64px',
    }
  }
}))

export const AppContext = React.createContext<any | null>(null)

function App() {
  const classes = useStyles()
  const [mobileOpen, setMobileOpen] = React.useState(false)

  return (
    <>
      <CssBaseline />
      <AppContext.Provider value={{mobileOpen, setMobileOpen}}>
        <Router>
          <Header />
          <SideMenu />
          <div className={classes.content}>
            <Switch>
              <Route path="/empresas">
                <Empresa />
              </Route>
              <Route path="/contratos">
                <Contrato />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </div>
        </Router>
      </AppContext.Provider>
    </>
  )
}

export default App
