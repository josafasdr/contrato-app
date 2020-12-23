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

import ContaDialog from './ContaDialog'
import { ContratoContext } from '../contrato';
import * as contratoService from '../../services/contratoService';

const columns = [
  { id: 'valorConta', label: 'Valor do conta' },
  { id: 'dataRecebimento', label: 'Data de recebimento' },
  { id: 'dataVencimento', label: 'Data de vencimento' },
  { id: 'edit', label: '' },
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

export const ContaContext = createContext<any | null>({})

const ContaList = () => {
  const classes = useStyles()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [recordForEdit, setRecordForEdit] = useState(null)
  const { contrato, setContrato } = useContext(ContratoContext)

  const handleOpenDialog = (item:any) => {
    setRecordForEdit(item);
    setDialogOpen(true)
  }

  const handleExclude = (item: any) => {
    const index = contrato.contas.indexOf(item);
    if (index > -1) {
      contrato.contas.splice(index, 1);
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
        Inserir Conta
      </Button>

      <ContaContext.Provider value={{dialogOpen, setDialogOpen}}>
        <ContaDialog recordForEdit={recordForEdit} />

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
              {contrato?.contas && <TableBody>
                {contrato?.contas.map((row: any) => {
                  return (
                    <TableRow hover tabIndex={-1} key={`${row._id}`}>
                      <TableCell>{row.valorConta}</TableCell>
                      <TableCell>{(row.dataRecebimentoSetor ? row.dataRecebimentoSetor.substring(0, 10) : '')}</TableCell>
                      <TableCell>{(row.dataVencimentoConta ? row.dataVencimentoConta.substring(0, 10) : '')}</TableCell>
                      <TableCell>
                        <Button
                          className={classes.button}
                          size="small"
                          onClick={() => {handleOpenDialog(row)}}
                        >
                          <EditIcon />
                        </Button>
                      </TableCell>
                      <TableCell>
                        <form onSubmit={ () => {handleExclude(row)}}>
                          <input type="hidden" name="conta" value={row} />
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
      </ContaContext.Provider>
    </div>
  )
}

export default ContaList