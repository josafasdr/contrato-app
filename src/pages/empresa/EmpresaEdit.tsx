import { useContext, useEffect } from 'react'
import { useHistory, useParams, useRouteMatch } from 'react-router-dom'
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
  const { empresa, setEmpresa } = useContext(EmpresaContext)
  let history = useHistory()
  let { id } = useParams<{id?: string}>()
  const { url } = useRouteMatch()
  let readOnly: boolean = false

  const arrayMatch = url.split('/')
  if (arrayMatch[arrayMatch.length - 1] === 'detail') {
    readOnly = true
  }

  const handlePost = () => {
    axios({
      method: 'post',
      url: 'http://localhost:4000/empresas',
      headers: { 'Content-Type': 'application/json' },
      data: empresa.data
    }).then(() => {
      setEmpresa({
        ...empresa,
        data: {}
      })
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
      data: empresa.data
    }).then(() => {
      setEmpresa({
        ...empresa,
        data: {}
      })
      handleBack()
    }).catch((err) => {
      console.log(err)
    })
  }

  const handleBack = () => {
    history.push('/empresas')
  }

  const goEdit = () => {
    history.push(`/empresas/${id}/edit`)
  }

  // carrega os dados de uma empresa
  useEffect(() => {
    if (id) {
      axios({
        method: 'GET',
        url: `http://localhost:4000/empresas/${id}`
      })
      .then((response) => {
        setEmpresa((prevState: any) => ({
          ...prevState,
          data: response.data
        }))
      })
      .catch((error) => {
        console.log(error)
      })
    }
  }, [id, setEmpresa])

  return (
    <div>
      <Paper>
        <Box className={classes.box} component="fieldset">
          <legend className={classes.legend}>Empresa</legend>
          <EmpresaForm readOnly={readOnly} />
        </Box>

        <Box className={classes.box} component="fieldset">
          <legend className={classes.legend}>Endereço</legend>
          <EnderecoForm readOnly={readOnly} />
        </Box>

        <Box className={classes.box} component="fieldset">
          <legend className={classes.legend}>Telefones</legend>
          <TelefoneList readOnly={readOnly} />
        </Box>
      </Paper>
      <div className={classes.buttons}>
        <Button
          className={classes.button}
          variant="contained"
          size="small"
          onClick={handleBack}
        >{!!readOnly ? 'Voltar' : 'Cancelar'}</Button>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          size="small"
          onClick={
            (!!id && !readOnly) ? 
            handlePut : 
            (!id && !readOnly) ? 
            handlePost : 
            goEdit}
        >{!!readOnly ? 'Editar' : 'Salvar'}</Button>
      </div>
    </div>
  )
}

export default EmpresaEdit