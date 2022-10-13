import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Button, Collapse, ListItemButton, ListItemText } from '@mui/material';
import ResponseDisplay from './ResponseDisplay';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from "react-router-dom";
import NavBar from './components/NavBar';
import SideMenu from './components/SideMenu';

const drawerWidth = 240;

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== 'open',
// })(({ theme, open }) => ({
//   zIndex: theme.zIndex.drawer + 1,
//   transition: theme.transitions.create(['width', 'margin'], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(['width', 'margin'], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

// const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
//   ({ theme, open }) => ({
//     '& .MuiDrawer-paper': {
//       position: 'relative',
//       whiteSpace: 'nowrap',
//       width: drawerWidth,
//       transition: theme.transitions.create('width', {
//         easing: theme.transitions.easing.sharp,
//         duration: theme.transitions.duration.enteringScreen,
//       }),
//       boxSizing: 'border-box',
//       ...(!open && {
//         overflowX: 'hidden',
//         transition: theme.transitions.create('width', {
//           easing: theme.transitions.easing.sharp,
//           duration: theme.transitions.duration.leavingScreen,
//         }),
//         width: theme.spacing(7),
//         [theme.breakpoints.up('sm')]: {
//           width: theme.spacing(9),
//         },
//       }),
//     },
//   }),
// );

const mdTheme = createTheme();

function DashboardContent() {

  const [accountingOpen, setAccountingOpen] = React.useState(true);
  const toggleAccountingList = () => {
    setAccountingOpen(!accountingOpen);
  }

  const [connected, setConnected] = React.useState(false);
  const [connectButtonText, setConnectButtonText] = React.useState("Connect to Xero");
  const [connectButtonIsDisabled, setConnectButtonIsDisabled] = React.useState(false);
  const connectToXero = () => {
    setConnectButtonText("Connected to Xero");
    setConnectButtonIsDisabled(true);

    setConnected(true);

    fetch('/api/connect')
    .then( (response) => response.json())
    .then(data => {
      console.log(data.consentUrl);
      window.location.href = data.consentUrl;
    })
    .catch(err => "error")
  }

  const navigate = useNavigate();

  const getOrganisations = () => {
    fetch('/api/organisations')
    .then((response) => response.json()
    )
    .then(data => 
      { 
        console.log(data.organisations[0]);
        navigate('/organisations');
      })
    .catch(err => "error")
  }

  const getAccounts = () => {
    fetch('/api/accounts')
    .then((response) => response.json())
    .then(data => 
      {
        console.log(data.accounts[0]);
        navigate('/accounts');
      })
    .catch(err => console.log(err))
  }

  const getContacts = () => {
    fetch('/api/contacts')
    .then((response) => response.json())
    .then(data => 
      {
        console.log(data.contacts[0]);
        navigate('/contacts');
      })
    .catch(err => console.log(err))
  }

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <NavBar 
          connectToXero={connectToXero} 
          connectButtonIsDisabled={connectButtonIsDisabled} 
          connectButtonText={connectButtonText}
        />
        {/* <AppBar position="absolute" open={open}>
          <Toolbar>
            <Button 
              variant='contained'
              onClick={connectToXero}
              disabled={connectButtonIsDisabled}
              // startIcon={'client/public/assets/8b6963f7-38bb-4360-9693-8ed01584812f.jpeg'}
              sx={{
                marginRight: '24px'
              }}
              >
              {connectButtonText}
            </Button>
          </Toolbar>
        </AppBar> */}
        <SideMenu
          accountingOpen = {accountingOpen}
          toggleAccountingList = {toggleAccountingList}
          getOrganisations = {getOrganisations}
          getAccounts = {getAccounts}
          getContacts = {getContacts}
          ></SideMenu>
        {/* <Drawer variant="permanent" open={open}>
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
            <ListItemButton onClick={toggleAccountingList}>
              <ListItemText primary="Accounting" />
              {accountingOpen ? <ExpandLess/> : <ExpandMore/>}
            </ListItemButton>
            <Collapse in={accountingOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4}}>
                  <ListItemText primary="Accounts"/>
                </ListItemButton>
                <ListItemButton sx={{ pl: 4}}>
                  <ListItemText primary="Contacts"/>
                </ListItemButton>
                <ListItemButton sx={{ pl: 4}} onClick={getOrganisations}>
                  <ListItemText primary="Organisations"/>
                </ListItemButton>
              </List>
            </Collapse>
          </List>
        </Drawer> */}
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing='3'>
                <Grid>
                    <Paper
                    sx={{
                      height: '40vh',
                      width: '55vw',
                      marginLeft: 'auto',
                      marginRight: 'auto'
                    }}>
                      <ResponseDisplay></ResponseDisplay>
                    </Paper>
                </Grid>
            </Grid>
            {/* <Copyright sx={{ pt: 4 }} /> */}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}