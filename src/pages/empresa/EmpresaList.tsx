import { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
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
  TablePagination,
  TableRow
} from '@material-ui/core'
import VisibilityIcon from '@material-ui/icons/Visibility'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'

import { EmpresaContext } from '.'
import useService from '../../hooks/useService'
import EmpresaDeleteDialog from './EmpresaDeleteDialog'

const columns = [
  { id: 'rasaoSocial', label: 'Razão Social' },
  { id: 'nomeFantasia', label: 'Nome' },
  { id: 'cnpj', label: 'CNPJ' },
  { id: 'email', label: 'E-mail' },
  { id: 'actions', label: 'Ações' }
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
    maxHeight: '73vh'
  },

  editLink: {
    color: 'gray',
    marginRight: '10px'
  }
})

const EmpresaList = () => {
  const classes = useStyles()
  const { setEmpresa } = useContext(EmpresaContext)
  const { loading, data, error } = useService({
    url: 'http://localhost:4000/empresas',
    //url: 'https://contrato-api.herokuapp.com/empresas',
    method: 'GET'
  })

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const handleChangePage = (_: any, newPage: any) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const openDeleteDialog = (id: string) => {
    setEmpresa({
      data: { ...data, _id: id },
      openDialog: true
    })
  }

  return (
    <div className={classes.root}>
      <EmpresaDeleteDialog />

      <Link to={`/empresas/create`}>
        <Button
          className={classes.button}
          variant="contained"
          size="small"
          color="primary"
        >
          Inserir Empresa
        </Button>
      </Link>
      {
        loading ? 
          <p>Carregando...</p> : 
        error ? 
          <p>Erro :(</p> :
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
              <TableBody>
                {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any) => {
                  return (
                    <TableRow hover tabIndex={-1} key={row._id}>
                      {/* <TableCell>{new Date(parseInt(row.createdAt)).toLocaleDateString('pt-br')}</TableCell> */}
                      {/* <TableCell>{row._id}</TableCell> */}
                      <TableCell>{row.nomeFantasia}</TableCell>
                      <TableCell>{row.razaoSocial}</TableCell>
                      <TableCell>{row.cnpj}</TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>
                        <Link className={classes.editLink} to={`/empresas/${row._id}/detail`}>
                          <VisibilityIcon titleAccess="Detalhes" aria-label="Detalhes" />
                        </Link>
                        <Link className={classes.editLink} to={`/empresas/${row._id}/edit`}>
                          <EditIcon titleAccess="Editar" aria-label="Editar" />
                        </Link>
                        <Link className={classes.editLink} to='#'
                          onClick={() => openDeleteDialog(row._id)}
                        >
                          <DeleteIcon titleAccess="Excluir" aria-label="Excluir" />
                        </Link>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            labelRowsPerPage="Linhas por página"
            rowsPerPageOptions={[10, 25, 100]}
            labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      }
    </div>
  )
}

export default EmpresaList