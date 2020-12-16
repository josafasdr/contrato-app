import React, { useContext } from 'react'
import {
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
        value={empresa?.razaoSocial || ''}
        onChange={handleChange}
      />

      <TextField
        className={clsx(classes.textField, classes.flexGrow1)}
        label="Nome Fantasia"
        name="nomeFantasia"
        value={empresa?.nomeFantasia || ''}
        onChange={handleChange}
      />

      <TextField
        className={classes.textField}
        label="CNPJ"
        name="cnpj"
        value={empresa?.cnpj || ''}
        onChange={handleChange}
      />

      <TextField
        className={classes.textField}
        type="email"
        label="E-mail"
        name="email"
        value={empresa?.email || ''}
        onChange={handleChange}
      />
    </div>
  )
}

export default EmpresaForm