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
    width: '50%',
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
  const { contrato, setContrato } = useContext(ContratoContext)

  const handleOpenDialog = () => {
    setDialogOpen(true)
  }

  const handleExclude = (event: any) => {
    event.preventDefault()
    event.persist()

    const obj = event.target.conta
    Object.keys(obj).forEach(key => {
      if (obj[key].name && obj[key].name === 'conta') {
        const conta = obj[key].value

        if (conta && conta !== undefined) {
          const contas = contrato.contas.filter((item: any) => item !== conta)
          setContrato({
            ...contrato,
            contas: contas
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
        Inserir Conta
      </Button>

      <ContaContext.Provider value={{dialogOpen, setDialogOpen}}>
        <ContaDialog />

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
                    <TableRow hover tabIndex={-1} key={`${row.tipoConta}-${row.dataVencimentoConta}`}>
                      <TableCell>{row.valorConta}</TableCell>
                      <TableCell>{(row.dataRecebimentoSetor ? row.dataRecebimentoSetor.substring(0, 10) : '')}</TableCell>
                      <TableCell>{(row.dataVencimentoConta ? row.dataVencimentoConta.substring(0, 10) : '')}</TableCell>
                      <TableCell>
                        <Button
                          className={classes.button}
                          size="small"
                          onClick={handleOpenDialog}
                        >
                          <EditIcon />
                        </Button>
                      </TableCell>
                      <TableCell>
                        <form onSubmit={handleExclude}>
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