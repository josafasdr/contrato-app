import { useState, useEffect } from 'react'
//import { List, ListItem, ListItemText, Container } from "@material-ui/core"
import {
  makeStyles,
  Button,
  TextField,
  Container,
  Table,
  TableBody,
  TableCell,
  TableSortLabel,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper
} from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'

import useService from '../../hooks/useService'
//import { Empresa } from '../../model/Empresa'

const useStyles = makeStyles({
  navigate: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& .MuiButton-root': {
      padding: '0 10px',
      margin: '0 5px 5px 5px'
    }
  },

  empresa: {
    margin: '0 10px'
  }
})

/* const columns = [
  { id: 'empresa', label: 'Empresa' },
  { id: 'dataPagamentoConta', label: 'Data' },
  { id: 'valorPago', label: 'Valor' },
  { id: 'taxaJuros', label: 'Taxa Juros' },
] */

/* const pagamentos = [
  {
    empresa: { nomeFantasia: 'Empresa Um' },
    dataPagamentoConta: '2020-08-12',
    valorPago: 10000,
    taxaJuros: 2
  },
  {
    empresa: { nomeFantasia: 'Empresa Dois' },
    dataPagamentoConta: '2020-08-12',
    valorPago: 20000,
    taxaJuros: 2
  },
  {
    empresa: { nomeFantasia: 'Empresa Três' },
    dataPagamentoConta: '2020-08-12',
    valorPago: 30000,
    taxaJuros: 2
  },
  {
    empresa: { nomeFantasia: 'Empresa Quatro' },
    dataPagamentoConta: '2020-08-12',
    valorPago: 40000,
    taxaJuros: 2
  }
] */

const columns = [
  { id: 'nomeFantasia', label: 'Nome' },
  { id: 'razaoSocial', label: 'Razão' },
  { id: 'cnpj', label: 'CNPJ' },
  { id: 'email', label: 'E-mail' },
]

export const RelatorioPagamento = () => {
  const classes = useStyles()
  const { loading, data, error } = useService({
    method: 'GET',
    url: `${process.env.REACT_APP_PATH_API}/empresas`
  })
  const [index, setIndex] = useState(0)
  const [id, setId] = useState(null)
  const [inputValue, setInputValue] = useState('')

  const handleIncrement = () => {
    if (index !== (data.length - 1)) {
      setIndex(prev => (prev + 1))
      setInputValue('')
    }
  }

  const handleDecrement = () => {
    if (index !== 0) {
      setIndex(prev => (prev - 1))
      setInputValue('')
    }
  }

  const handleFirst = () => {
    setIndex(0)
    setInputValue('')
  }

  const handleLast = () => {
    setIndex(data.length - 1)
    setInputValue('')
  }

  const autocompleteChange = (event: any, value: any, reason: any) => {
    if (reason === 'select-option') {
      setId(value._id)
    }
  }

  const inputValueChange = (_: any, value: any) => {
    setInputValue(value)
  }

  useEffect(() => {
    if (id !== null) {
      const empresa = data.filter(item => item._id === id)
      const newIndex = data.indexOf(empresa[0])
      setIndex(newIndex)
    }
    console.log(id)
  }, [id, data])

  return (
    loading ? 
      <p>Carregando...</p> : 
    error ? 
      <p>Erro :(</p> :
    data && <Container component={Paper}>
      <h3>Relatório de Pagamentos</h3>

      <Autocomplete
        id="combo-box-demo"
        fullWidth={true}
        options={data}
        getOptionLabel={(option) => option.nomeFantasia}
        style={{ marginBottom: 5 }}
        onChange={autocompleteChange}
        inputValue={inputValue}
        onInputChange={inputValueChange}
        renderInput={(params) =>
          <TextField
            {...params}
            label="Filtrar empresa"
            variant="outlined"
            size="small"
          />
        }
      />

      <div className={classes.navigate}>
        <Button variant="contained" onClick={handleFirst} title="Primeiro">&lt;&lt;</Button>
        <Button variant="contained" onClick={handleDecrement} title="Anterior">&lt;</Button>
        {data && <Typography className={classes.empresa} variant="h5">{data[index].nomeFantasia}</Typography>}
        <Button variant="contained" onClick={handleIncrement} title="Próximo">&gt;</Button>
        <Button variant="contained" onClick={handleLast} title="Último">&gt;&gt;</Button>
      </div>

      <TableContainer>
        <Table>
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
            <TableRow hover tabIndex={-1}>
                <TableCell>{data[index].nomeFantasia}</TableCell>
                <TableCell>{data[index].razaoSocial}</TableCell>
                <TableCell>{data[index].cnpj}</TableCell>
                <TableCell>{data[index].email}</TableCell>
              </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      {/* <List>
        {pagamentos.map((item: any, index) => (
          <ListItem key={index} divider>
            <ListItemText
              primary={item.empresa.nomeFantasia}
              secondary={`Valor: ${item.valorPago}`}
            />
          </ListItem>
        ))}
      </List> */}
    </Container>
  )
}