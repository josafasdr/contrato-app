import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
  makeStyles,
  Paper,
  Box,
  Button
} from '@material-ui/core'
import axios from 'axios'

import EmpresaForm from './EmpresaForm'
import TelefoneForm from '../telefone/TelefoneForm'
import { EmpresaContext } from '.'


const useStyles = makeStyles((theme) => ({
  box: {
    borderStyle: 'none',
    marginTop: '5px'
  },

  legend: {
    fontWeight: 'bold',
    fontSize: 'medium'
  },

  buttons: {
    marginTop: '10px'
  },

  button: {
    textTransform: 'none',
    [theme.breakpoints.up('sm')]: {
      marginRight: '10px'
    }
  }
}))

const EmpresaEdit = () => {
  const classes = useStyles()
  const [empresa, setEmpresa] = useState<any>(null)
  const history = useHistory()

  const handleSubmit = () => {
    axios({
      method: 'post',
      url: 'http://localhost:4000/empresas',
      headers: { 'Content-Type': 'application/json' },
      data: empresa
    }).then((response) => {
      console.log(response)
      handleBack()
    }).catch((err) => {
      console.log(err)
    })
  }

  const handleBack = () => {
    history.push('/empresas')
  }

  return (
    <div>
      <Paper>
        <EmpresaContext.Provider value={{ empresa, setEmpresa }}>
          <Box className={classes.box} component="fieldset">
            <legend className={classes.legend}>Empresa</legend>
            <EmpresaForm />
          </Box>

          <Box className={classes.box} component="fieldset">
            <legend>Telefones</legend>
            <TelefoneForm />
          </Box>
        </EmpresaContext.Provider>
      </Paper>
      <div className={classes.buttons}>
        <Button
          className={classes.button}
          variant="contained"
          size="small"
          onClick={handleBack}
        >Cancelar</Button>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          size="small"
          onClick={handleSubmit}
        >Salvar</Button>
      </div>
    </div>
  )
}

export default EmpresaEdit