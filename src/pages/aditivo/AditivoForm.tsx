import { useEffect, useState } from 'react'
import {
    FormControl,
    InputLabel,
  makeStyles,
  TextField
} from '@material-ui/core'

import Aditivo from '../../model/Aditivo'
//import { AditivoContext } from './AditivoList'

const useStyles = makeStyles((theme) => ({
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
    marginTop: '30px',
    [theme.breakpoints.up('sm')]: {
      marginRight: '10px'
    }
  },

  flexGrow1: {
    flexGrow: 1
  }
}))

const AditivoForm = (props: any) => {
  const classes = useStyles()
  const [aditivo, setAditivo] = useState<Aditivo>({ })
  const [change, setChange] = useState(false)
  //const { aditivos, setAditivos } = useContext(AditivoContext)
  

  const handleChange = (event: any) => {
    const { name, value } = event.target
    setAditivo({
      ...aditivo,
      [name]: value
    })
    setChange(true)
  }

  useEffect(() => {
    if (props.onChange && change) {
      props.onChange(aditivo)
    }
    setChange(false)
  }, [props, aditivo, change])

  return (
    <div className={classes.form}>
      
      <TextField
        className={classes.textField}
        type="number"
        label="Valor"
        name="valorContratoAditivo"
        value={aditivo?.valorContratoAditivo || ''}
        onChange={handleChange}
      />

      <FormControl className={classes.margin}>
        <InputLabel htmlFor="data-renovacao-label">Data de Renovação</InputLabel>
        <TextField
          id="data-renovacao-label"
          className={classes.textField}
          type="date"
          name="dataRenovacao"
          value={aditivo?.dataRenovacao || ''}
          onChange={handleChange}
        />
      </FormControl>

      <FormControl className={classes.margin}>
        <InputLabel htmlFor="data-vencimento-label">Data de Vencimento</InputLabel>
        <TextField
          id="data-vencimento-label"
          className={classes.textField}
          type="date"
          name="dataVencimento"
          value={aditivo?.dataVencimento || ''}
          onChange={handleChange}
        />
      </FormControl>

      <TextField
        className={classes.textField}
        label="Observações"
        name="observacoes"
        value={aditivo?.observacoes || ''}
        onChange={handleChange}
      />

    </div>
  )
}

export default AditivoForm