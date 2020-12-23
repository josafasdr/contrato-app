import { FormControl, Input, InputLabel, makeStyles, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel } from "@material-ui/core"
import { useState } from "react";
import { Link } from "react-router-dom";
import useService from "../../hooks/useService";
import * as contratoService from '../../services/contratoService';


const columns = [
    { id: 'numero', label: 'Número' },
    { id: 'tipoContrato', label: 'Tipo de Contrato' },
    { id: 'statusContrato', label: 'Status' },
    { id: 'valorContrato', label: 'Valor' },
];
  
const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      maxWidth: 300,
    },
    root: {
      display: 'flex',
      flexDirection: 'column',
      [theme.breakpoints.up('sm')]: {
        flexDirection: 'row',
        flexWrap: 'wrap'
      }
    },
  
    container: {
        maxHeight: '73vh'
    },
    
    margin: {
      margin: theme.spacing(1),
    },
  
    grid: {
      width: '100%'
    },
  
    textField: {
      marginTop: '30px',
      [theme.breakpoints.up('sm')]: {
        marginRight: '10px'
      }
    },
  
    flexGrow1: {
      flexGrow: 1
    },

    editLink: {
        color: 'inherit'
    }
}))

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const RelatorioContratos = () => {
    const classes = useStyles()
    const { loading, data, error } = useService({
        url: `${process.env.REACT_APP_PATH_API}/empresas`,
        method: 'GET'
    })
    const [contratos, setContratos] = useState([]);
    
    
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)

    const handleChangePage = (_: any, newPage: any) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event: any) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    const handleChange = (event: any) => {
      const { name, value } = event.target;

      contratoService.getByEmpresa(value)
      .then((response) => {
        setContratos(response.data);
      }).catch((err) => {
        console.log(err)
      })
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

    return (
        <Paper>
            <FormControl className={classes.formControl}>
              <InputLabel id="empresa-label">Empresa</InputLabel>
              <Select 
                labelId="empresa-label"
                id="empresa"
                name="_idEmpresa"
                input={<Input />}
                MenuProps={MenuProps}
                onChange={handleChange}>
                  {data.map((empresa:any) => (
                    <MenuItem key={empresa._id} value={empresa._id}>
                      {empresa.razaoSocial}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>

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
                        {contratos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any) => {
                        return (
                            <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                                <TableCell>{row.numero}</TableCell>
                                <TableCell>{tiposContrato[row.tipoContrato]}</TableCell>
                                <TableCell>{tiposStatusContrato[row.statusContrato]}</TableCell>
                                <TableCell>{new Intl.NumberFormat("pt-BR", {
                                              style: "currency",
                                              "currency": "BRL"
                                            }).format(row.valorContrato)}</TableCell>
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
                count={contratos.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    )
}