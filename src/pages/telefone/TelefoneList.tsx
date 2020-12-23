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
  { id: 'telefone', label: 'Telefone' }
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
    color: 'gray'
  }
})

export const TelefoneContext = createContext<any | null>({})

const TelefoneList = (props: any) => {
  const classes = useStyles()
  const { readOnly } = props
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
          const telefones = empresa.data.telefones.filter((item: any) => item !== telefone)
          setEmpresa({
            ...empresa,
            data: {
              ...empresa.data,
              telefones: telefones
            }
          })
        }
      }
    })
  }

  return (
    <div className={classes.root}>
      {!readOnly && <Button
        className={classes.button}
        variant="contained"
        size="small"
        color="primary"
        onClick={handleOpenDialog}
      >
        Inserir Telefone
      </Button>}

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
                  {/* coluna de ações */}
                  {!readOnly && <TableCell style={{ backgroundColor: '#f5f5f5' }}>
                      Ações
                    <TableSortLabel />
                  </TableCell>}
                </TableRow>
              </TableHead>
              {empresa?.data?.telefones && <TableBody>
                {empresa?.data?.telefones.map((row: any) => {
                  return (
                    <TableRow hover tabIndex={-1} key={`${row.ddd}-${row.telefone}`}>
                      <TableCell>{row.ddd}</TableCell>
                      <TableCell>{row.telefone}</TableCell>
                      {!readOnly && <TableCell>
                        <form onSubmit={handleExclude}>
                          <input type="hidden" name="telefone" value={row} />
                          <Button type="submit" className={classes.editLink}>
                            <DeleteIcon titleAccess="Excluir" />
                          </Button>
                        </form>
                      </TableCell>}
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