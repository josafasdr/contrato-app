import { useContext, useState } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

import { ContratoContext } from '../contrato'
import AditivoForm from './AditivoForm'
import { AditivoContext } from './AditivoList'

const AditivoDialog = () => {
  const { contrato, setContrato } = useContext(ContratoContext)
  const [aditivo, setAditivo] = useState({ ddd: '', aditivo: '' })
  const { dialogOpen, setDialogOpen } = useContext(AditivoContext)

  const handleClose = () => {
    if (Object.keys(aditivo).length > 0) {
      setContrato({
        ...contrato,
        aditivos: [...contrato.aditivos, aditivo]
      })
    }
    setDialogOpen(false)
  }

  const handleChange = (data: any) => {
    setAditivo(data)
  }

  return (
    <div>
      <Dialog open={dialogOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Inserir Aditivo</DialogTitle>
        <DialogContent>
          <AditivoForm onChange={handleChange} />
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

export default AditivoDialog