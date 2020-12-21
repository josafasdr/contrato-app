import { useContext } from 'react'
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

const EmpresaForm = (props: any) => {
  const classes = useStyles()
  const { readOnly } = props
  const { empresa, setEmpresa } = useContext(EmpresaContext)

  const handleChange = (event: any) => {
    const { name, value } = event.target
    setEmpresa({
      ...empresa,
      data: { ...empresa.data, [name]: value }
    })
  }

  return (
    <div className={classes.root}>
      <TextField
        className={clsx(classes.textField, classes.flexGrow1)}
        label="Razão Social"
        name="razaoSocial"
        value={empresa?.data?.razaoSocial || ''}
        onChange={handleChange}
        inputProps={{ readOnly: readOnly }}
      />

      <TextField
        className={clsx(classes.textField, classes.flexGrow1)}
        label="Nome Fantasia"
        name="nomeFantasia"
        value={empresa?.data?.nomeFantasia || ''}
        onChange={handleChange}
        inputProps={{ readOnly: readOnly }}
      />

      <TextField
        className={classes.textField}
        label="CNPJ"
        name="cnpj"
        value={empresa?.data?.cnpj || ''}
        onChange={handleChange}
        inputProps={{ readOnly: readOnly }}
      />

      <TextField
        className={classes.textField}
        type="email"
        label="E-mail"
        name="email"
        value={empresa?.data?.email || ''}
        onChange={handleChange}
        inputProps={{ readOnly: readOnly }}
      />
    </div>
  )
}

export default EmpresaForm