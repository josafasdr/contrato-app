import { useContext, useState } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

import { EmpresaContext } from '../empresa'
import TelefoneForm from './TelefoneForm'
import { TelefoneContext } from './TelefoneList'

const TelefoneDialog = () => {
  const { empresa, setEmpresa } = useContext(EmpresaContext)
  const [telefone, setTelefone] = useState({ ddd: '', telefone: '' })
  const { dialogOpen, setDialogOpen } = useContext(TelefoneContext)

  const handleClose = () => {
    if (Object.keys(telefone).length > 0) {
      setEmpresa({
        ...empresa,
        telefones: [...empresa.telefones, telefone]
      })
    }
    setDialogOpen(false)
  }

  const handleChange = (data: any) => {
    setTelefone(data)
  }

  return (
    <div>
      <Dialog open={dialogOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Inserir Telefone</DialogTitle>
        <DialogContent>
          <TelefoneForm onChange={handleChange} />
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

export default TelefoneDialog