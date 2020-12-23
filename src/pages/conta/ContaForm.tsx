import { useEffect, useState } from 'react'
import {
    FormControl,
    Input,
    InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField
} from '@material-ui/core'

import Conta from '../../model/Conta'
//import { ContaContext } from './ContaList'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
      
  form: {
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
    marginTop: '50px',
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

const ContaForm = (props: any) => {
  const classes = useStyles()
  const [conta, setConta] = useState<Conta>(props.recordForEdit || {})
  const [change, setChange] = useState(false)
  //const { contas, setContas } = useContext(ContaContext)
  
  const tiposConta = [
    {value: 1, texto: "Licitatório"},
    {value: 2, texto: "Permanente"},
    {value: 3, texto: "Consultoria"}
  ]

  const tiposStatusConta = [
    {value: 1, texto: "Ativo"},
    {value: 2, texto: "Finalizado"},
    {value: 3, texto: "Cancelado"}
  ]


  const handleChange = (event: any) => {
    const { name, value } = event.target
    setConta({
      ...conta,
      [name]: value
    })
    setChange(true)
  }

  useEffect(() => {
    if (props.onChange && change) {
      props.onChange(conta)
    }
    setChange(false)
  }, [props, conta, change])

  return (
    <div className={classes.form}>
      
      <TextField
        className={classes.textField}
        label="Cópia da Conta"
        name="copiaConta"
        value={conta?.copiaConta || ''}
        onChange={handleChange}
      />

      <FormControl className={classes.formControl}>
        <InputLabel id="tipo-conta-label">Tipo de Conta</InputLabel>
        <Select 
          labelId="tipo-conta-label"
          id="tipoConta"
          name="tipoConta"
          value={conta?.tipoConta || 0}
          input={<Input />}
          MenuProps={MenuProps}
          onChange={handleChange}>
            {tiposConta.map((tipoConta:any) => (
              <MenuItem key={tipoConta.value} value={tipoConta.value}>
                {tipoConta.texto}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      
      <FormControl className={classes.formControl}>
        <InputLabel id="status-conta-label">Status de Conta</InputLabel>
        <Select 
          labelId="status-conta-label"
          id="statusConta"
          name="statusConta"
          value={conta?.statusConta || 0}
          input={<Input />}
          MenuProps={MenuProps}
          onChange={handleChange}>
            {tiposStatusConta.map((statusConta:any) => (
              <MenuItem key={statusConta.value} value={statusConta.value}>
                {statusConta.texto}
              </MenuItem>
            ))}
        </Select>
      </FormControl>

      <FormControl className={classes.margin}>
        <InputLabel htmlFor="data-recebimento-setor-label">Data de Recebimento do Setor</InputLabel>
        <TextField
          id="data-recebimento-setor-label"
          className={classes.textField}
          type="date"
          name="dataRecebimentoSetor"
          value={conta?.dataRecebimentoSetor || ''}
          onChange={handleChange}
        />
      </FormControl>

      <FormControl className={classes.margin}>
        <InputLabel htmlFor="data-vencimento-conta-label">Data de Vencimento da Conta</InputLabel>
        <TextField
          id="data-vencimento-conta-label"
          className={classes.textField}
          type="date"
          name="dataVencimentoConta"
          value={conta?.dataVencimentoConta || ''}
          onChange={handleChange}
        />
      </FormControl>
      
      <TextField
        className={classes.textField}
        type="number"
        label="Valor"
        name="valorConta"
        value={conta?.valorConta || ''}
        onChange={handleChange}
      />

      <TextField
        className={classes.textField}
        label="Observações"
        name="observacoesConta"
        value={conta?.observacoesConta || ''}
        onChange={handleChange}
      />

    </div>
  )
}

export default ContaForm