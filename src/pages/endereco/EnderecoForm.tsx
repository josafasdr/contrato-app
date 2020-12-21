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

const EnderecoForm = (props: any) => {
  const classes = useStyles()
  const { readOnly } = props
  const { empresa, setEmpresa } = useContext(EmpresaContext)

  const handleChange = (event: any) => {
    const { name, value } = event.target
    const { endereco } = empresa.data
    setEmpresa({
      ...empresa,
      data: {
        ...empresa.data,
        endereco: { ...endereco, [name]: value }
      }
    })
  }

  return (
    <div className={classes.root}>
      <TextField
        className={clsx(classes.textField, classes.flexGrow1)}
        label="Rua"
        name="rua"
        value={empresa?.data?.endereco?.rua || ''}
        onChange={handleChange}
        inputProps={{ readOnly: readOnly }}
      />

      <TextField
        className={clsx(classes.textField, classes.flexGrow1)}
        label="Número"
        name="numero"
        value={empresa?.data?.endereco?.numero || ''}
        onChange={handleChange}
        inputProps={{ readOnly: readOnly }}
      />

      <TextField
        className={classes.textField}
        label="Bairro"
        name="bairro"
        value={empresa?.data?.endereco?.bairro || ''}
        onChange={handleChange}
        inputProps={{ readOnly: readOnly }}
      />

      <TextField
        className={classes.textField}
        label="Cidade"
        name="cidade"
        value={empresa?.data?.endereco?.cidade || ''}
        onChange={handleChange}
        inputProps={{ readOnly: readOnly }}
      />

      <TextField
        className={classes.textField}
        label="Estado"
        name="uf"
        value={empresa?.data?.endereco?.uf || ''}
        onChange={handleChange}
        inputProps={{ readOnly: readOnly }}
      />
    </div>
  )
}

export default EnderecoForm