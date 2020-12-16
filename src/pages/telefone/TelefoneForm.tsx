import { useState } from 'react'
import {
  makeStyles,
  TextField
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      flexWrap: 'wrap'
    }
  },

  grid: {
    width: '100%'
  },

  textField: {
    marginTop: '10px',
    [theme.breakpoints.up('sm')]: {
      marginRight: '10px'
    }
  },

  flexGrow1: {
    flexGrow: 1
  }
}))

const TelefoneForm = () => {
  const classes = useStyles()
  const [telefone, setTelefone] = useState({ ddd: '', telefone: '' })

  const handleChange = (event: any) => {
    const { name, value } = event.target
    setTelefone({
      ...telefone,
      [name]: value
    })
  }

  return (
    <div className={classes.form}>
      <TextField
        className={classes.textField}
        label="DDD"
        name="ddd"
        defaultValue={telefone?.ddd || ''}
        onBlur={handleChange}
      />

      <TextField
        className={classes.textField}
        label="Telefone"
        name="telefone"
        defaultValue={telefone?.telefone || ''}
        onBlur={handleChange}
      />
    </div>
  )
}

export default TelefoneForm