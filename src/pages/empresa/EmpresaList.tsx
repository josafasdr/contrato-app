import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    //display: 'flex'
  }
})

const EmpresaList = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <h3>Empresa List</h3>
    </div>
  )
}

export default EmpresaList