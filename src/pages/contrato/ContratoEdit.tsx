import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import {
  makeStyles,
  Paper,
  Box,
  Button
} from '@material-ui/core'

import ContratoForm from './ContratoForm'
import { ContratoContext } from './index'
import AditivoList from '../aditivo/AditivoList'
import ContaList from '../conta/ContaList'
import * as contratoService from '../../services/contratoService';

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
    
    contratoService.insert(contrato)
      .then((response) => {
        handleBack()
      }).catch((err) => {
        console.log(err)
      })
  }

  const handlePut = () => {
    contratoService.update(contrato, id)
    .then((response) => {
      handleBack()
    }).catch((err) => {
      console.log(err)
    })
  }

  const handleBack = () => {
    history.push('/contratos')
  }

  useEffect(() => {
    if (id) {
      contratoService.get(id)
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
          <Box className={classes.box} component="fieldset">
            <legend className={classes.legend}>Aditivos</legend>
            <AditivoList />
          </Box>
          <Box className={classes.box} component="fieldset">
            <legend className={classes.legend}>Contas</legend>
            <ContaList />
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