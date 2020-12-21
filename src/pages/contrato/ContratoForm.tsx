import { FormControl, Input, InputLabel, makeStyles, MenuItem, OutlinedInput, Select, TextField } from '@material-ui/core'
import { useContext } from 'react'
import clsx from 'clsx'

import { ContratoContext } from '.'
import useService from '../../hooks/useService'

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


const ContratoForm = () => {
  const classes = useStyles()
  const  {contrato, setContrato} = useContext(ContratoContext)
  const { loading, data, error } = useService({
    url: `${process.env.REACT_APP_PATH_API}/empresas`,
    method: 'GET'
  })

  const tiposContrato = [
    {value: 1, texto: "Licitatório"},
    {value: 2, texto: "Permanente"},
    {value: 3, texto: "Consultoria"}
  ]

  const prestacoes = [
    {value: 1, texto: "Serviço"},
    {value: 2, texto: "Produto"}
  ]

  const tiposStatusContrato = [
    {value: 1, texto: "Ativo"},
    {value: 2, texto: "Finalizado"},
    {value: 3, texto: "Cancelado"}
  ]

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setContrato({
      ...contrato,
      [name]: value
    })
  }

  return (
    <div className={classes.root}>
      <FormControl className={classes.formControl}>
        <InputLabel id="empresa-label">Empresa</InputLabel>
        <Select 
          labelId="empresa-label"
          id="empresa"
          name="_idEmpresa"
          value={contrato?._idEmpresa || 0}
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
      <TextField
        className={clsx(classes.textField, classes.flexGrow1)}
        label="Número"
        name="numero"
        value={contrato?.numero || ''}
        onChange={handleChange}
      />  

      <TextField
        className={clsx(classes.textField, classes.flexGrow1)}
        label="Cópia do Contrato"
        name="copiaContrato"
        value={contrato?.copiaContrato || ''}
        onChange={handleChange}
      />

      <FormControl className={classes.formControl}>
        <InputLabel id="tipo-contrato-label">Tipo de Contrato</InputLabel>
        <Select 
          labelId="tipo-contrato-label"
          id="tipoContrato"
          name="tipoContrato"
          value={contrato?.tipoContrato || 0}
          input={<Input />}
          MenuProps={MenuProps}
          onChange={handleChange}>
            {tiposContrato.map((tipoContrato:any) => (
              <MenuItem key={tipoContrato.value} value={tipoContrato.value}>
                {tipoContrato.texto}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      
      <FormControl className={classes.formControl}>
        <InputLabel id="prestacao-label">Prestação</InputLabel>
        <Select 
          labelId="prestacao-label"
          id="prestacao"
          name="prestacao"
          value={contrato?.prestacao || 0}
          input={<Input />}
          MenuProps={MenuProps}
          onChange={handleChange}>
            {prestacoes.map((prestacao:any) => (
              <MenuItem key={prestacao.value} value={prestacao.value}>
                {prestacao.texto}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
  
      <FormControl className={classes.formControl}>
        <InputLabel id="status-contrato-label">Status de Contrato</InputLabel>
        <Select 
          labelId="status-contrato-label"
          id="statusContrato"
          name="statusContrato"
          value={contrato?.statusContrato || 0}
          input={<Input />}
          MenuProps={MenuProps}
          onChange={handleChange}>
            {tiposStatusContrato.map((statusContrato:any) => (
              <MenuItem key={statusContrato.value} value={statusContrato.value}>
                {statusContrato.texto}
              </MenuItem>
            ))}
        </Select>
      </FormControl>

      <TextField
        className={classes.textField}
        type="number"
        label="Valor"
        name="valorContrato"
        value={contrato?.valorContrato || ''}
        onChange={handleChange}
      />

      <FormControl className={classes.margin}>
        <InputLabel htmlFor="data-celebracao-label">Data de Celebração</InputLabel>
        <TextField
          id="data-celebracao-label"
          className={classes.textField}
          type="date"
          name="dataCelebracaoContrato"
          value={contrato?.dataCelebracaoContrato || ''}
          onChange={handleChange}
        />
      </FormControl>

      <FormControl className={classes.margin}>
        <InputLabel htmlFor="data-finalizacao-label">Data de Finalização</InputLabel>
        <TextField
          className={classes.textField}
          type="date"
          name="dataFinalizacaoContrato"
          value={contrato?.dataFinalizacaoContrato || ''}
          onChange={handleChange}
        />
      </FormControl>

      <TextField
        className={classes.textField}
        label="Observações"
        name="observacoesContrato"
        value={contrato?.observacoesContrato || ''}
        onChange={handleChange}
      />
    </div>
  )
}

export default ContratoForm