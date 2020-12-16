import { useContext } from 'react'
import {
  //Grid,
  makeStyles,
  TextField
} from '@material-ui/core'
import clsx from 'clsx'

import { EmpresaContext } from '.'

const useStyles = makeStyles((theme) => ({
  root: {
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

const EmpresaForm = () => {
  const classes = useStyles()
  const { empresa, setEmpresa } = useContext(EmpresaContext)

  const handleChange = (event: any) => {
    const { name, value } = event.target
    setEmpresa({
      ...empresa,
      [name]: value
    })
  }

  return (
    <div className={classes.root}>
      <TextField
        className={clsx(classes.textField, classes.flexGrow1)}
        label="Razão Social"
        name="razaoSocial"
        defaultValue={empresa?.razaoSocial || ''}
        onBlur={handleChange}
      />

      <TextField
        className={clsx(classes.textField, classes.flexGrow1)}
        label="Nome Fantasia"
        name="nomeFantasia"
        defaultValue={empresa?.nomeFantasia || ''}
        onBlur={handleChange}
      />

      <TextField
        className={classes.textField}
        label="CNPJ"
        name="cnpj"
        defaultValue={empresa?.cnpj || ''}
        onBlur={handleChange}
      />

      <TextField
        className={classes.textField}
        type="email"
        label="E-mail"
        name="email"
        defaultValue={empresa?.email || ''}
        onBlur={handleChange}
      />
    </div>
  )
}

export default EmpresaForm