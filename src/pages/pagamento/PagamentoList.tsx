import { createContext, useContext, useState } from 'react'
import {
  makeStyles,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableSortLabel,
  TableContainer,
  TableHead,
  TableRow
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'

import PagamentoDialog from './PagamentoDialog'
import { ContaContext } from '../conta/ContaList';
import { ContratoContext } from '../contrato';
import * as contratoService from '../../services/contratoService';

const columns = [
  { id: 'dataPagamentoConta', label: 'Data do Pagamento' },
  { id: 'valorPago', label: 'Valor Pago' },
  { id: 'taxaJuros', label: 'Taxa de Juros' },
  { id: 'delete', label: '' }
];

const useStyles = makeStyles({
  root: {
    width: '100%'
  },

  button: {
    margin: '10px 0 10px 0',
    textTransform: 'none'
  },

  container: {
    width: '100%',
    minWidth: '200px'
  },

  editLink: {
    color: 'inherit'
  }
})

export const PagamentoContext = createContext<any | null>({})

const PagamentoList = (props:any) => {

  const classes = useStyles()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [recordForEdit, setRecordForEdit] = useState(null)
  const [conta, setConta] = useState({...props.conta});
  const { contrato, setContrato } = useContext(ContratoContext)

  const handleOpenDialog = (item:any) => {
    setRecordForEdit(item);
    setDialogOpen(true)
  }

  const handleExclude = (item: any) => {

    for(let contaContrato of contrato.contas){
      if(contaContrato._id === conta._id){
        const index = contaContrato.pagamentos.indexOf(item);
        if (index > -1) {
          contaContrato.pagamentos.splice(index, 1);
        }
    
      }
    }

    contratoService.update(contrato, contrato._id);
  }

  return (
    <div className={classes.root}>
      <Button
        className={classes.button}
        variant="contained"
        size="small"
        color="primary"
        onClick={() =>{handleOpenDialog({})}}
      >
        Inserir Pagamento
      </Button>

      <PagamentoContext.Provider value={{dialogOpen, setDialogOpen}}>
        <PagamentoDialog recordForEdit={props.conta} />

        <Paper className={classes.root}>
          <TableContainer className={classes.container}>
            <Table stickyHeader={true} aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column: any) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ backgroundColor: '#f5f5f5' }}
                    >
                      {column.label}
                      <TableSortLabel />
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              {conta?.pagamentos && <TableBody>
                {conta?.pagamentos.map((row: any) => {
                  return (
                    <TableRow hover tabIndex={-1} key={`${row.dataPagamentoConta}-${row.valorPago}`}>
                      <TableCell>{(row.dataPagamentoConta ? row.dataPagamentoConta.substring(0, 10) : '')}</TableCell>
                      <TableCell>{row.valorPago}</TableCell>
                      <TableCell>{row.taxaJuros}</TableCell>
                      <TableCell>
                          <form onSubmit={ () => {handleExclude(row)}}>
                          <input type="hidden" name="pagamento" value={row} />
                          <Button type="submit" className={classes.editLink}>
                            <DeleteIcon />
                          </Button>
                        </form>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>}
            </Table>
          </TableContainer>
        </Paper>
      </PagamentoContext.Provider>
    </div>
  )
}

export default PagamentoList