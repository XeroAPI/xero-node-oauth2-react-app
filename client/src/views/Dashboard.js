import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import ResponseDisplay from './components/ResponseDisplay';
import NavBar from './components/NavBar';
import SideMenu from './components/SideMenu';

const drawerWidth = 240;

const mdTheme = createTheme();

const Dashboard = () => {
  const [accountingOpen, setAccountingOpen] = React.useState(true);
  const toggleAccountingList = () => {
    setAccountingOpen(!accountingOpen);
  }

  const [connected, setConnected] = React.useState(false);
  const [connectButtonText, setConnectButtonText] = React.useState("Connect to Xero");
  const [connectButtonIsDisabled, setConnectButtonIsDisabled] = React.useState(false);
  const [displayContentText, setDisplayContentText] = React.useState('Please authenticate to explore the tutorial. This tutorial will show developers how to utilise our API endpoints with the "xero-node" SDK version in package.json. WARNING! This tutorial will Create, Read, Update and Delete REAL objects in the authenticated Xero organisation. Please only authenticate with a Demo Company or a non-production organisation.')

  const connectToXero = () => {
    fetch('/api/connect')
    .then( (response) => response.json())
    .then(data => {
      console.log(data.consentUrl);
      window.location.href = data.consentUrl;
    })
    // .then (() => {
    //   setConnectButtonText("Connected to Xero");
    //   setConnectButtonIsDisabled(true);
    //   setConnected(true);
    // })
    .catch(err => console.log(err))
  }
  
  const getOrganisations = () => {
    fetch('/api/organisations')
    .then((response) => response.json()
    )
    .then(data => 
      { 
        console.log(data.organisations[0]);
        setDisplayContentText(JSON.stringify(data.organisations[0]));
      })
    .catch(err => console.log(err))
  }

  const getAccounts = () => {
    fetch('/api/accounts')
    .then((response) => response.json())
    .then(data => 
      {
        console.log(data.accounts[0]);
        setDisplayContentText(JSON.stringify(data.accounts[0]));
      })
    .catch(err => console.log(err))
  }

  const getContacts = () => {
    fetch('/api/contacts')
    .then((response) => response.json())
    .then(data => 
      {
        console.log(data.contacts[0]);
        setDisplayContentText(JSON.stringify(data.contacts[0]));
      })
    .catch(err => console.log(err))
  }

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <NavBar 
          drawerWidth={drawerWidth}
          connectToXero={connectToXero} 
          connectButtonIsDisabled={connectButtonIsDisabled} 
          connectButtonText={connectButtonText}
        />
        <SideMenu
          drawerWidth = {drawerWidth}
          accountingOpen = {accountingOpen}
          toggleAccountingList = {toggleAccountingList}
          getOrganisations = {getOrganisations}
          getAccounts = {getAccounts}
          getContacts = {getContacts}
          setDisplayContentText = {setDisplayContentText}
          ></SideMenu>
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
                      <ResponseDisplay displayContent={displayContentText}></ResponseDisplay>
                    </Paper>
                </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Dashboard;