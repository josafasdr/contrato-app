import { useState, useEffect, useRef } from 'react'
import {
  makeStyles,
  Button,
  TextField,
  Container,
  Typography,
  Paper
} from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import axios from 'axios'

import useService from '../../hooks/useService'

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
  },

  head: {
    display: 'flex'
  },

  column: {
    flexGrow: 1,
    padding: '10px 0',
    textAlign: 'center',
    backgroundColor: '#e9e9e9'
  },

  contratos: {
    display: 'flex',
    alignItems: 'center',
    height: 'auto',
    borderStyle: 'solid',
    borderColor: '#e9e9e9',
    '& div': {
      textAlign: 'center',
    }
  },

  contas: {
    display: 'flex',
    flexDirection: 'column'
  },

  conta: {
    display: 'flex'
  },

  pagamentos: {
    display: 'flex',
    flexDirection: 'column'
  },

  pagamento: {
    display: 'flex'
  }
})

export const RelatorioPagamento = () => {
  const classes = useStyles()
  const { loading, data, error } = useService({
    method: 'GET',
    url: `${process.env.REACT_APP_PATH_API}/empresas`
  })
  const [index, setIndex] = useState(0)
  const [id, setId] = useState(null)
  const [inputValue, setInputValue] = useState('')
  const [contratos, setContratos] = useState([])
  const dataRef = useRef<any>(null)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [width, setWidth] = useState()

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
  }, [id, data])

  useEffect(() => {
    if (data.length > 0) {
      axios({
        url: `${process.env.REACT_APP_PATH_API}/pagamentos?idEmpresa=${data[index]._id}`
      })
      .then(response => setContratos(response.data))
      .catch(error => console.log(error))
    }
  }, [data, index])

  const handleResize = () => {
    setWidth(dataRef.current.offsetWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [dataRef])

  return (
    loading ? 
      <div>Carregando...</div> : 
    error ? 
      <div>Erro :(</div> :
    data && <Container component={Paper}>
      <h3>Relatório de Pagamentos por Empresa</h3>

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

      <div ref={dataRef}>
        <div className={classes.head}>
          <div className={classes.column} style={{ width: (dataRef.current?.offsetWidth/5) }}>Período Contrato</div>
          <div className={classes.column} style={{ width: (dataRef.current?.offsetWidth/5) }}>Vencimento Conta</div>
          <div className={classes.column} style={{ width: (dataRef.current?.offsetWidth/5) }}>Data Pagamento</div>
          <div className={classes.column} style={{ width: (dataRef.current?.offsetWidth/5) }}>Juros</div>
          <div className={classes.column} style={{ width: (dataRef.current?.offsetWidth/5) }}>Valor</div>
        </div>
        {(contratos.length > 0) && contratos.map((contrato: any) => {
          return (
            <div key={contrato._id} className={classes.contratos}>
              <div style={{ width: (dataRef.current?.offsetWidth/5) }}>
                {`${contrato.dataCelebracaoContrato ?
                  new Date(contrato.dataCelebracaoContrato).toLocaleDateString('pt-br') :
                ''}${contrato.dataFinalizacaoContrato ?
                  ' a ' + new Date(contrato.dataFinalizacaoContrato).toLocaleDateString('pt-br') : 
                  ''}`}
              </div>
              <div className={classes.contas}>
                {(contrato.contas.length > 0) && contrato.contas.map((conta: any) => {
                  return (
                    <div className={classes.conta}>
                      <div style={{ width: (dataRef.current?.offsetWidth/5), height: 'auto', alignSelf: 'center' }}>
                        {`${conta.dataVencimentoConta ?
                          new Date(conta.dataVencimentoConta).toLocaleDateString('pt-br') :
                        ''}`}
                      </div>
                      <div className={classes.pagamentos}>
                        {(conta.pagamentos?.length > 0) && conta.pagamentos?.map((pagamento: any) => {
                          return (
                            <div className={classes.pagamento}>
                              <div style={{ width: (dataRef.current?.offsetWidth/5) }}>
                                {pagamento.dataPagamentoConta ? 
                                  new Date(pagamento.dataPagamentoConta).toLocaleDateString('pt-br') :
                                ''}
                              </div>
                              <div style={{ width: (dataRef.current?.offsetWidth/5) }}>
                                {pagamento.taxaJuros ? 
                                  new Intl.NumberFormat("pt-BR", {
                                    style: "percent",
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                  }).format(pagamento.taxaJuros) :
                                  new Intl.NumberFormat("pt-BR", {
                                    style: "percent",
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                  }).format(0)}
                              </div>
                              <div style={{ width: (dataRef.current?.offsetWidth/5) }}>
                                {pagamento.valorPago ?
                                  new Intl.NumberFormat("pt-BR", {
                                    style: "currency",
                                    "currency": "BRL"
                                  }).format(pagamento.valorPago) :
                                  ''}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </Container>
  )
}