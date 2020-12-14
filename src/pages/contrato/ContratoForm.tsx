import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    //display: 'flex'
  }
})

const ContratoForm = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <h3>Contrato Form</h3>
    </div>
  )
}

export default ContratoForm