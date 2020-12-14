import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    //display: 'flex'
  }
})

const Home = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <h3>Home</h3>
    </div>
  )
}

export default Home