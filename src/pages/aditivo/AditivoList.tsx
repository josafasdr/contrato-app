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

import AditivoDialog from './AditivoDialog'
import { ContratoContext } from '../contrato';

const columns = [
  { id: 'valorContratoAditivo', label: 'Valor do aditivo' },
  { id: 'dataRenovacao', label: 'Data de renovação' },
  { id: 'dataVencimento', label: 'Data de vencimento' },
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

export const AditivoContext = createContext<any | null>({})

const AditivoList = () => {
  const classes = useStyles()
  const [dialogOpen, setDialogOpen] = useState(false)
  const { contrato, setContrato } = useContext(ContratoContext)

  const handleOpenDialog = () => {
    setDialogOpen(true)
  }

  const handleExclude = (event: any) => {
    event.preventDefault()
    event.persist()

    const obj = event.target.aditivo
    Object.keys(obj).forEach(key => {
      if (obj[key].name && obj[key].name === 'aditivo') {
        const aditivo = obj[key].value

        if (aditivo && aditivo !== undefined) {
          const aditivos = contrato.aditivos.filter((item: any) => item !== aditivo)
          setContrato({
            ...contrato,
            aditivos: aditivos
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
        Inserir Aditivo
      </Button>

      <AditivoContext.Provider value={{dialogOpen, setDialogOpen}}>
        <AditivoDialog />

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
              {contrato?.aditivos && <TableBody>
                {contrato?.aditivos.map((row: any) => {
                  return (
                    <TableRow hover tabIndex={-1} key={`${row.dataRenovacao}-${row.valorContratoAditivo}`}>
                      <TableCell>{row.valorContratoAditivo}</TableCell>
                      <TableCell>{(row.dataRenovacao ? row.dataRenovacao.substring(0, 10) : '')}</TableCell>
                      <TableCell>{(row.dataVencimento ? row.dataVencimento.substring(0, 10) : '')}</TableCell>
                      <TableCell>
                        <form onSubmit={handleExclude}>
                          <input type="hidden" name="aditivo" value={row} />
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
      </AditivoContext.Provider>
    </div>
  )
}

export default AditivoList