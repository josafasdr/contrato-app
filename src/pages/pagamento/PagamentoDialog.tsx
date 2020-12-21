import { useContext, useState } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

import { ContaContext } from '../conta/ContaList'
import PagamentoForm from './PagamentoForm'
import { PagamentoContext } from './PagamentoList'

const PagamentoDialog = () => {
  const { conta, setConta } = useContext(ContaContext)
  const [pagamento, setPagamento] = useState({ ddd: '', pagamento: '' })
  const { dialogOpen, setDialogOpen } = useContext(PagamentoContext)

  const handleClose = () => {
    if (Object.keys(pagamento).length > 0) {
      setConta({
        ...conta,
        pagamentos: [...conta.pagamentos, pagamento]
      })
    }
    setDialogOpen(false)
  }

  const handleChange = (data: any) => {
    setPagamento(data)
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
          <Button onClick={handleClose} color="primary">
            Inserir
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default PagamentoDialog