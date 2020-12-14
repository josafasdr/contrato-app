import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    //display: 'flex'
  }
})

const EmpresaForm = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <h3>Empresa Form</h3>
    </div>
  )
}

export default EmpresaForm