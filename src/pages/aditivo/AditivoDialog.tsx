import { useContext, useState } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

import { ContratoContext } from '../contrato'
import AditivoForm from './AditivoForm'
import { AditivoContext } from './AditivoList'
import * as contratoService from '../../services/contratoService';

const AditivoDialog = (props:any) => {

  if(props.recordForEdit){
    if(props.recordForEdit.dataRenovacao)
      props.recordForEdit.dataRenovacao = props.recordForEdit.dataRenovacao.substring(0, 10);
    if(props.recordForEdit.dataVencimento)  
      props.recordForEdit.dataVencimento = props.recordForEdit.dataVencimento.substring(0, 10);
  }


  const { contrato, setContrato } = useContext(ContratoContext)
  const [aditivo, setAditivo] = useState({...props.recordForEdit})
  const { dialogOpen, setDialogOpen } = useContext(AditivoContext)

  const handleClose = () => {
    setDialogOpen(false)
  }

  const handleChange = (data: any) => {
    setAditivo(data)
  }

  const handleInsert = () => {

    if(contrato.aditivos)
      contrato.aditivos.push(aditivo);
    else{
      contrato.aditivos = [aditivo];
    }

    contratoService.update(contrato, contrato._id)
      .then((response) => {
        setDialogOpen(false)
      }).catch((err) => {
        console.log(err)
    })

  }

  const handleEdit = () => {
    for(let aditivoContrato of contrato.aditivos){
      if(aditivoContrato._id == aditivo._id){
        const index = contrato.aditivos.indexOf(aditivoContrato);
        if (index > -1) {
          contrato.aditivos.splice(index, 1);
        }
        contrato.aditivos = [...contrato.aditivos, aditivo];
      }
    }
    setContrato({
      ...contrato,
      aditivos: [...contrato.aditivos]
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
        <DialogTitle id="form-dialog-title">Inserir Aditivo</DialogTitle>
        <DialogContent>
          <AditivoForm recordForEdit={props.recordForEdit} onChange={handleChange} />
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

export default AditivoDialog