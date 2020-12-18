import React, { useContext } from 'react'
import {
  makeStyles,
  TextField
} from '@material-ui/core'
import clsx from 'clsx'

import { EmpresaContext } from '../empresa'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      flexWrap: 'wrap'
    }
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

const EnderecoForm = () => {
  const classes = useStyles()
  const { empresa, setEmpresa } = useContext(EmpresaContext)

  const handleChange = (event: any) => {
    const { name, value } = event.target
    setEmpresa({
      ...empresa,
      endereco: { ...empresa.endereco, [name]: value }
    })
  }

  return (
    <div className={classes.root}>
      <TextField
        className={clsx(classes.textField, classes.flexGrow1)}
        label="Rua"
        name="rua"
        value={empresa?.endereco?.rua || ''}
        onChange={handleChange}
      />

      <TextField
        className={clsx(classes.textField, classes.flexGrow1)}
        label="Número"
        name="numero"
        value={empresa?.endereco?.numero || ''}
        onChange={handleChange}
      />

      <TextField
        className={classes.textField}
        label="Bairro"
        name="bairro"
        value={empresa?.endereco?.bairro || ''}
        onChange={handleChange}
      />

      <TextField
        className={classes.textField}
        label="Cidade"
        name="cidade"
        value={empresa?.endereco?.cidade || ''}
        onChange={handleChange}
      />

      <TextField
        className={classes.textField}
        label="Estado"
        name="uf"
        value={empresa?.endereco?.uf || ''}
        onChange={handleChange}
      />
    </div>
  )
}

export default EnderecoForm