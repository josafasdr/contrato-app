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

import TelefoneDialog from './TelefoneDialog'
import { EmpresaContext } from '../empresa';

const columns = [
  // { id: '_id', label: 'Id', minWidth: 50 },
  { id: 'ddd', label: 'DDD' },
  { id: 'telefone', label: 'Telefone' },
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

export const TelefoneContext = createContext<any | null>({})

const TelefoneList = () => {
  const classes = useStyles()
  const [dialogOpen, setDialogOpen] = useState(false)
  const { empresa, setEmpresa } = useContext(EmpresaContext)

  const handleOpenDialog = () => {
    setDialogOpen(true)
  }

  const handleExclude = (event: any) => {
    event.preventDefault()
    event.persist()

    const obj = event.target.telefone
    Object.keys(obj).forEach(key => {
      if (obj[key].name && obj[key].name === 'telefone') {
        const telefone = obj[key].value

        if (telefone && telefone !== undefined) {
          console.log(telefone)
          const telefones = empresa.telefones.filter((item: any) => item !== telefone)
          console.log(telefones)
          setEmpresa({
            ...empresa,
            telefones: telefones
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
        Inserir Telefone
      </Button>

      <TelefoneContext.Provider value={{dialogOpen, setDialogOpen}}>
        <TelefoneDialog />

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
              {empresa?.telefones && <TableBody>
                {empresa?.telefones.map((row: any) => {
                  return (
                    <TableRow hover tabIndex={-1} key={`${row.ddd}-${row.telefone}`}>
                      <TableCell>{row.ddd}</TableCell>
                      <TableCell>{row.telefone}</TableCell>
                      <TableCell>
                        <form onSubmit={handleExclude}>
                          <input type="hidden" name="telefone" value={row} />
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
      </TelefoneContext.Provider>
    </div>
  )
}

export default TelefoneList