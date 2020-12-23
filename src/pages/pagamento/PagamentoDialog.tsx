import { useContext, useState } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

import { ContaContext } from '../conta/ContaList'
import PagamentoForm from './PagamentoForm'
import { PagamentoContext } from './PagamentoList'
import * as contratoService from '../../services/contratoService';
import { ContratoContext } from '../contrato'

const PagamentoDialog = (props:any) => {

  console.log('props = ', props)

  if(props.recordForEdit){
    if(props.recordForEdit.dataPagamentoConta)
      props.recordForEdit.dataPagamentoConta = props.recordForEdit.dataPagamentoConta.substring(0, 10);
  }

  const { contrato, setContrato } = useContext(ContratoContext)
  const [conta, setConta] = useState(props.recordForEdit)
  const [pagamento, setPagamento] = useState({ _id:0})
  const { dialogOpen, setDialogOpen } = useContext(PagamentoContext)

  console.log('contrato = ', contrato)
  console.log('conta = ', conta)

  const handleClose = () => {
    setDialogOpen(false)
  }

  const handleChange = (data: any) => {
    setPagamento(data)
  }

  const handleInsert = () => {

    console.log('handleinsert pagamento = ', contrato)

    for(let contaContrato of contrato.contas){
      console.log('contaContrato._id = ', contaContrato._id)
      console.log('conta._id = ', conta._id)
      if(contaContrato._id === conta._id){
        if(contaContrato.pagamentos)
          contaContrato.pagamentos.push(pagamento);
        else{
          contaContrato.pagamentos = [pagamento];
        }
    
      }
    }

    console.log('final handleinsert pagamento = ', contrato)
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
        <DialogTitle id="form-dialog-title">Inserir Pagamento</DialogTitle>
        <DialogContent>
          <PagamentoForm onChange={handleChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleInsert} color="primary">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default PagamentoDialog