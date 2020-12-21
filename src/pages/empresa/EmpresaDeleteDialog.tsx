import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle 
} from '@material-ui/core'

import { EmpresaContext } from '.'

const EmpresaDeleteDialog = () => {
  const { empresa, setEmpresa } = useContext(EmpresaContext)
  const history = useHistory()

  const handleClose = () => {
    setEmpresa({
      ...empresa,
      openDialog: false
    })
  }

  const handleDelete = () => {
    const { data } = empresa
    axios({
      method: 'DELETE',
      url: `http://localhost:4000/empresas/${data._id}`,
      headers: { 'Content-Type': 'application/json' }
    })
    .then(() => {
      handleClose()
      history.replace('/empresas')
    })
    .catch((err) => {
      console.log(err)
    })
  }

  return (
    <div>
      <Dialog open={empresa.openDialog} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Excluir Empresa</DialogTitle>
        <DialogContent>
          Tem certeza que deseja excluir a empresa <b>{empresa?.data?.nome}</b>?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={() => handleDelete()} color="primary">
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default EmpresaDeleteDialog