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
import { useNavigate } from "react-router-dom";

const SideMenu = (props) => {
    const navigate = useNavigate(); 

    const homeClicked = () => {
      if (props.connectionState) {
        props.getTenant();
        
      } else {
        props.setContentTitle('Please Connect to Xero');
        props.setDisplayContentText('Please authenticate to explore the tutorial. This tutorial will show developers how to utilise our API endpoints with the "xero-node" SDK version in package.json. WARNING! This tutorial will Create, Read, Update and Delete REAL objects in the authenticated Xero organisation. Please only authenticate with a Demo Company or a non-production organisation.')
      }

    }

    const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
        ({ theme, open }) => ({
          '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: props.drawerWidth,
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
                homeClicked();
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