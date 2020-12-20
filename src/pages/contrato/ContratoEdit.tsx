import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import {
  makeStyles,
  Paper,
  Box,
  Button
} from '@material-ui/core'
import axios from 'axios'

import ContratoForm from './ContratoForm'
import { ContratoContext } from './index'

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

const ContratoEdit = () => {
  const classes = useStyles()
  const [contrato, setContrato] = useState<any>(null)
  const history = useHistory()
  let { id } = useParams<{id?: string}>()

  const handlePost = () => {
    
    if(!contrato){
      alert('Digite as informações do contrato')
      return;
    }

    if(!contrato._idEmpresa || contrato._idEmpresa === 0){
      alert('Empresa precisa ser selecionado')
      return;
    }
    
    axios({
      method: 'post',
      url: `${process.env.REACT_APP_PATH_API}/contratos`,
      headers: { 'Content-Type': 'application/json' },
      data: contrato
    }).then((response) => {
      handleBack()
    }).catch((err) => {
      console.log(err)
    })
  }

  const handlePut = () => {
    axios({
      method: 'put',
      url: `${process.env.REACT_APP_PATH_API}/contratos/${id}`,
      headers: { 'Content-Type': 'application/json' },
      data: contrato
    }).then((response) => {
      handleBack()
    }).catch((err) => {
      console.log(err)
    })
  }

  const handleBack = () => {
    history.push('/Contratos')
  }

  useEffect(() => {
    if (id) {
      axios({
        method: 'GET',
        url: `${process.env.REACT_APP_PATH_API}/contratos/${id}`
      })
      .then((response) => {
        if(response.data.dataCelebracaoContrato)
          response.data.dataCelebracaoContrato = response.data.dataCelebracaoContrato.substring(0, 10);
        if(response.data.dataFinalizacaoContrato)  
          response.data.dataFinalizacaoContrato = response.data.dataFinalizacaoContrato.substring(0, 10);
        setContrato(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
    }
  }, [id, setContrato])

  return (
    <div>
      <Paper>
        <ContratoContext.Provider value={{ contrato, setContrato }}>
          <Box className={classes.box} component="fieldset">
            <legend className={classes.legend}>Contrato</legend>
            <ContratoForm />
          </Box>
        </ContratoContext.Provider>
      </Paper>
      <div className={classes.buttons}>
        <Button
          className={classes.button}
          variant="contained"
          size="small"
          onClick={() => {handleBack()}}
        >Cancelar</Button>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          size="small"
          onClick={() => {!!id ? handlePut() : handlePost()}}
        >Salvar</Button>
      </div>
    </div>
  )
}

export default ContratoEdit