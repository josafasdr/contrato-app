import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  makeStyles,
  useTheme,
  Hidden,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from "@material-ui/core"
import HomeIcon from '@material-ui/icons/Home'
import HomeWorkIcon from '@material-ui/icons/HomeWork'
import FindInPageIcon from '@material-ui/icons/FindInPage'
import NoteAddIcon from '@material-ui/icons/NoteAdd'

import { AppContext } from '../App/App'

/**
 * Styles
 */
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    left: '0px',
    height: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '250px',
      flexShrink: 0,
    }
  },

  drawerRoot: {
    backgroundColor: '#f2f2f2',
  },

  drawerPaper: {
    width: '250px',
    top: '48px',
    [theme.breakpoints.up('sm')]: {
      top: '64px'
    }
  },

  linkList: {
    margin: theme.spacing(0, 1, 1, 1)
  },

  link: {
    textDecoration: 'none',
    color: 'inherit'
  },

  active: {
    backgroundColor: '#e9e9e9'
  },

  divider: {
    margin: theme.spacing(1, 0, 1, 0),
    height: '3px',
    backgroundColor: '#5f5f5f',
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: '#a3a3a3'
  }
}))

const SideMenu = (props: any) => {
  const { window } = props
  const classes = useStyles()
  const theme = useTheme()
  const { mobileOpen, setMobileOpen } = React.useContext(AppContext)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const links = (
    <List component="nav" className={classes.linkList}>
      <ListItem
        button
        component={NavLink}
        exact
        to="/"
        className={classes.link}
        activeClassName={classes.active}
      >
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>

      <Divider className={classes.divider} />

      <ListItem
        button
        component={NavLink}
        //exact
        to="/empresas"
        className={classes.link}
        activeClassName={classes.active}
      >
        <ListItemIcon>
          <HomeWorkIcon />
        </ListItemIcon>
        <ListItemText primary="Empresas" />
      </ListItem>

      <ListItem
        button
        component={NavLink}
        exact
        to="/contratos"
        className={classes.link}
        activeClassName={classes.active}
      >
        <ListItemIcon>
          <FindInPageIcon />
        </ListItemIcon>
        <ListItemText primary="Contratos" />
      </ListItem>

    </List>
  )

  const container = window !== undefined ? () => window().document.body : undefined

  return (
    <nav className={classes.root} aria-label="mailbox folders">
      <Hidden smUp implementation="css">
        <Drawer
          container={container}
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          onClick={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          PaperProps={{
            classes: {
              root: classes.drawerRoot
            }
          }}
        >
          {links}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper
          }}
          PaperProps={{
            classes: {
              root: classes.drawerRoot
            }
          }}
          variant="permanent"
          open
        >
          {links}
        </Drawer>
      </Hidden>
    </nav>
  )
}

export default SideMenu