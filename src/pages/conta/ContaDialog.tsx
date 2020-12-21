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
  
const ContaDialog = () => {
  const classes = useStyles()
  const { contrato, setContrato } = useContext(ContratoContext)
  const [conta, setConta] = useState({ ddd: '', conta: '' })
  const { dialogOpen, setDialogOpen } = useContext(ContaContext)

  const handleClose = () => {
    if (Object.keys(conta).length > 0) {
      setContrato({
        ...contrato,
        contas: [...contrato.contas, conta]
      })
    }
    setDialogOpen(false)
  }

  const handleChange = (data: any) => {
    setConta(data)
  }

  return (
    <div>
      <Dialog open={dialogOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Inserir Conta</DialogTitle>
        <DialogContent>
          <ContaForm onChange={handleChange} />
          <Box className={classes.box} component="fieldset">
            <legend className={classes.legend}>Contas</legend>
            <PagamentoList />
          </Box>
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

export default ContaDialog