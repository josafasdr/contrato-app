import { Button, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import useService from '../../hooks/useService';
import axios from 'axios'

const columns = [
  { id: 'numero', label: 'Número' },
  { id: 'tipoContrato', label: 'Tipo de Contrato' },
  { id: 'statusContrato', label: 'Status' },
  { id: 'valorContrato', label: 'Valor' }
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
    color: 'inherit'
  }
})

const ContratoList = () => {
  const classes = useStyles()
  const { loading, data, error } = useService({
    url: `${process.env.REACT_APP_PATH_API}/contratos`,
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

  const tiposContrato = [
    "Nenhum",
    "Licitatório",
    "Permanente",
    "Consultoria"
  ]

  const tiposStatusContrato = [
    "Nenhum",
    "Ativo",
    "Finalizado",
    "Cancelado"
  ]

  function deleteContrato(id:any){
    axios({
      method: 'delete',
      url: `${process.env.REACT_APP_PATH_API}/contratos/${id}`,
      headers: { 'Content-Type': 'application/json' }
    }).then((response) => {
      window.location.reload();
    }).catch((err) => {
      console.log(err)
    })
  }

  return (
    <div className={classes.root}>
      <Link to={`/contratos/create`}>
        <Button
          className={classes.button}
          variant="contained"
          size="small"
          color="primary"
        >
          Inserir Contrato
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
                    <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                      <TableCell>{row.numero}</TableCell>
                      <TableCell>{tiposContrato[row.tipoContrato]}</TableCell>
                      <TableCell>{tiposStatusContrato[row.statusContrato]}</TableCell>
                      <TableCell>{row.valorContrato}</TableCell>
                      <TableCell>
                        <Link className={classes.editLink} to={`/contratos/${row._id}/edit`}>
                          <EditIcon />
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Button
                          className={classes.button}
                          variant="contained"
                          size="small"
                          onClick={() => {deleteContrato(row._id)}}
                        >
                          <DeleteIcon />
                        </Button>
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

export default ContratoList