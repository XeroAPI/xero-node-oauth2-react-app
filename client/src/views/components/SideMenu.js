import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import { Button, Collapse, ListItemButton, ListItemText } from '@mui/material';
import Divider from '@mui/material/Divider';
import Toolbar from '@mui/material/Toolbar';
import HomeIcon from '@mui/icons-material/Home';
import List from '@mui/material/List';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      '& .MuiDrawer-paper': {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: 'border-box',
        ...(!open && {
          overflowX: 'hidden',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          width: theme.spacing(7),
          [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
          },
        }),
      },
    }),
  );

const SideMenu = (props) => {
    return (
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              // justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <Button
              variant='text'
              startIcon={< HomeIcon />}
              size="large"
              onClick={() => {
                console.log("home clicked");
                navigate("/");
              }}
            >
                Home
            </Button>
          </Toolbar>
          <Divider />
          <List component="nav">
            <ListItemButton onClick={props.toggleAccountingList}>
              <ListItemText primary="Accounting" />
              {props.accountingOpen ? <ExpandLess/> : <ExpandMore/>}
            </ListItemButton>
            <Collapse in={props.accountingOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4}} onClick={props.getAccounts}>
                  <ListItemText primary="Accounts"/>
                </ListItemButton>
                <ListItemButton sx={{ pl: 4}} onClick={props.getContacts}>
                  <ListItemText primary="Contacts"/>
                </ListItemButton>
                <ListItemButton sx={{ pl: 4}} onClick={props.getOrganisations}>
                  <ListItemText primary="Organisations"/>
                </ListItemButton>
              </List>
            </Collapse>
          </List>
        </Drawer>
    );
    

}


export default SideMenu;