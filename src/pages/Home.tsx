import { makeStyles } from '@material-ui/core'

import { RelatorioPagamento } from '../components/relatorios'

const useStyles = makeStyles({
  root: {
  }
})

const Home = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <RelatorioPagamento />
    </div>
  )
}

export default Home