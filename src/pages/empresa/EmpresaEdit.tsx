import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import {
  makeStyles,
  Paper,
  Box,
  Button
} from '@material-ui/core'
import axios from 'axios'

import { EmpresaContext } from './index'
import EmpresaForm from './EmpresaForm'
import TelefoneList from '../telefone/TelefoneList'
import EnderecoForm from '../endereco/EnderecoForm'

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
  let { id } = useParams<{id?: string}>()

  const handlePost = () => {
    axios({
      method: 'post',
      url: 'http://localhost:4000/empresas',
      headers: { 'Content-Type': 'application/json' },
      data: empresa
    }).then((response) => {
      handleBack()
    }).catch((err) => {
      console.log(err)
    })
  }

  const handlePut = () => {
    axios({
      method: 'put',
      url: `http://localhost:4000/empresas/${id}`,
      headers: { 'Content-Type': 'application/json' },
      data: empresa
    }).then((response) => {
      handleBack()
    }).catch((err) => {
      console.log(err)
    })
  }

  const handleBack = () => {
    history.push('/empresas')
  }

  useEffect(() => {
    if (id) {
      axios({
        method: 'GET',
        url: `http://localhost:4000/empresas/${id}`
      })
      .then((response) => {
        setEmpresa(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
    }
  }, [id, setEmpresa])

  return (
    <div>
      <Paper>
        <EmpresaContext.Provider value={{ empresa, setEmpresa }}>
          <Box className={classes.box} component="fieldset">
            <legend className={classes.legend}>Empresa</legend>
            <EmpresaForm />
          </Box>

          <Box className={classes.box} component="fieldset">
            <legend className={classes.legend}>Endereço</legend>
            <EnderecoForm />
          </Box>

          <Box className={classes.box} component="fieldset">
            <legend className={classes.legend}>Telefones</legend>
            <TelefoneList />
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
          onClick={!!id ? handlePut : handlePost}
        >Salvar</Button>
      </div>
    </div>
  )
}

export default EmpresaEdit