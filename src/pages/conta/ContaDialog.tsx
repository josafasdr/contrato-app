import { useContext, useState } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

import { ContratoContext } from '../contrato'
import ContaForm from './ContaForm'
import { ContaContext } from './ContaList'
import { Box, makeStyles } from '@material-ui/core'
import PagamentoList from '../pagamento/PagamentoList'
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
  
const ContaDialog = (props:any) => {

  if(props.recordForEdit){
    if(props.recordForEdit.dataVencimentoConta)
      props.recordForEdit.dataVencimentoConta = props.recordForEdit.dataVencimentoConta.substring(0, 10);
    if(props.recordForEdit.dataRecebimentoSetor)  
      props.recordForEdit.dataRecebimentoSetor = props.recordForEdit.dataRecebimentoSetor.substring(0, 10);
  }

  console.log('contadialog props.recordForEdit - ', props.recordForEdit)

  const classes = useStyles()
  const { contrato, setContrato } = useContext(ContratoContext)
  const [conta, setConta] = useState({...props.recordForEdit})
  const { dialogOpen, setDialogOpen } = useContext(ContaContext)

  const handleClose = () => {
    setDialogOpen(false)
  }

  const handleChange = (data: any) => {
    setConta(data)
  }

  const handleInsert = () => {

    if(contrato.contas)
      contrato.contas.push(conta);
    else{
      contrato.contas = [conta];
    }

    contratoService.update(contrato, contrato._id)
      .then((response) => {
        setDialogOpen(false)
      }).catch((err) => {
        console.log(err)
    })

  }

  const handleEdit = () => {
    for(let contaContrato of contrato.contas){
      if(contaContrato._id == conta._id){
        const index = contrato.contas.indexOf(contaContrato);
        if (index > -1) {
          contrato.contas.splice(index, 1);
        }
        contrato.contas = [...contrato.contas, conta];
      }
    }
    setContrato({
      ...contrato,
      contas: [...contrato.contas]
    })
    
    contratoService.update(contrato, contrato._id)
      .then((response) => {
        setDialogOpen(false)
      }).catch((err) => {
        console.log(err)
    })
    
  }

  return (
    <div>
      <Dialog open={dialogOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Inserir Conta</DialogTitle>
        <DialogContent>
          <ContaForm recordForEdit={props.recordForEdit} onChange={handleChange} />
          <Box className={classes.box} component="fieldset">
            <legend className={classes.legend}>Contas</legend>
            <PagamentoList conta={props.recordForEdit} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={(props.recordForEdit && props.recordForEdit._id ? handleEdit : handleInsert)} color="primary">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default ContaDialog