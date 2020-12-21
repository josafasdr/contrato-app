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

import PagamentoDialog from './PagamentoDialog'
import { ContaContext } from '../conta/ContaList';

const columns = [
  { id: 'dataPagamentoConta', label: 'Data do Pagamento' },
  { id: 'valorPago', label: 'Valor Pago' },
  { id: 'taxaJuros', label: 'Taxa de Juros' },
  { id: 'delete', label: 'Excluir' }
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
    width: '50%',
    minWidth: '200px'
  },

  editLink: {
    color: 'inherit'
  }
})

export const PagamentoContext = createContext<any | null>({})

const PagamentoList = () => {
  const classes = useStyles()
  const [dialogOpen, setDialogOpen] = useState(false)
  const { conta, setConta } = useContext(ContaContext)

  const handleOpenDialog = () => {
    setDialogOpen(true)
  }

  const handleExclude = (event: any) => {
    event.preventDefault()
    event.persist()

    const obj = event.target.pagamento
    Object.keys(obj).forEach(key => {
      if (obj[key].name && obj[key].name === 'pagamento') {
        const pagamento = obj[key].value

        if (pagamento && pagamento !== undefined) {
          const pagamentos = conta.pagamentos.filter((item: any) => item !== pagamento)
          setConta({
            ...conta,
            pagamentos: pagamentos
          })
        }
      }
    })
  }

  return (
    <div className={classes.root}>
      <Button
        className={classes.button}
        variant="contained"
        size="small"
        color="primary"
        onClick={handleOpenDialog}
      >
        Inserir Pagamento
      </Button>

      <PagamentoContext.Provider value={{dialogOpen, setDialogOpen}}>
        <PagamentoDialog />

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
                        <form onSubmit={handleExclude}>
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