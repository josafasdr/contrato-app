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
    setDialogOpen(false)
  }

  const handleInsert = () => {
    if (Object.keys(telefone).length > 0) {
      if (empresa.data && empresa.data.telefones) {
        setEmpresa({
          ...empresa,
          data: {
            ...empresa.data,
            telefones: [...empresa.data.telefones, telefone]
          }
        })
      } else {
        setEmpresa({
          ...empresa,
          data: {
            ...empresa.data,
            telefones: [telefone]
          }
        })
      }
      
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
          <Button onClick={handleInsert} color="primary">
            Inserir
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default TelefoneDialog