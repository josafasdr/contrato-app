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

import Pagamento from '../../model/Pagamento'
//import { PagamentoContext } from './PagamentoList'

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

const PagamentoForm = (props: any) => {
  const classes = useStyles()
  const [pagamento, setPagamento] = useState<Pagamento>({ })
  const [change, setChange] = useState(false)
  //const { pagamentos, setPagamentos } = useContext(PagamentoContext)
  

  const handleChange = (event: any) => {
    const { name, value } = event.target
    setPagamento({
      ...pagamento,
      [name]: value
    })
    setChange(true)
  }

  useEffect(() => {
    if (props.onChange && change) {
      props.onChange(pagamento)
    }
    setChange(false)
  }, [props, pagamento, change])

  return (
    <div className={classes.form}>
      <FormControl className={classes.margin}>
        <InputLabel htmlFor="data-pagamento-conta-label">Data de Pagamento da Conta</InputLabel>
        <TextField
          id="data-pagamento-conta-label"
          className={classes.textField}
          type="date"
          name="dataPagamentoConta"
          value={pagamento?.dataPagamentoConta || ''}
          onChange={handleChange}
        />
      </FormControl>
      
      <TextField
        className={classes.textField}
        type="number"
        label="Valor"
        name="valorPago"
        value={pagamento?.valorPago || ''}
        onChange={handleChange}
      />

      <TextField
        className={classes.textField}
        type="number"
        label="Taxa de Juros"
        name="taxaJuros"
        value={pagamento?.taxaJuros || ''}
        onChange={handleChange}
      />

    </div>
  )
}

export default PagamentoForm