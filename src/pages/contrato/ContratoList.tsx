import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    //display: 'flex'
  }
})

const ContratoList = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <h3>Contrato List</h3>
    </div>
  )
}

export default ContratoList