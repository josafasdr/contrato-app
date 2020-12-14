import React from 'react'
import { AppBar, IconButton, makeStyles, Toolbar, Typography } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'

import { AppContext } from '../App/App'

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: '#263238'
  },

  toolBar: {
    display: 'flex',
    justifyContent: 'space-between'
  },

  typoH6: {
    fontFamily: '"Courier New", "Courier", monospace'
  },

  menuButton: {
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },

  blink: {
    animation: '$blink-animation 1s steps(5, start) infinite',
    WebkitAnimation: '$blink-animation 1s steps(5, start) infinite'
  },

  '@keyframes blink-animation': {
    to: {
      visibility: 'hidden'
    }
  },

  '@-webkit-keyframes blink-animation': {
    to: {
      visibility: 'hidden'
    }
  }
}))

const Header = (props: any) => {
  const classes = useStyles()
  const {mobileOpen, setMobileOpen} = React.useContext(AppContext)

  const toggleOpen = () => {
    setMobileOpen(!mobileOpen)
  }

  return (
    <AppBar className={classes.appBar} position="fixed">
      <Toolbar className={classes.toolBar}>
        <Typography
          variant="h6"
          noWrap
          classes={{
            h6: classes.typoH6
          }}
        >
          Contrato Manager
          <span className={classes.blink}>|</span>
        </Typography>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="end"
          onClick={toggleOpen}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default Header