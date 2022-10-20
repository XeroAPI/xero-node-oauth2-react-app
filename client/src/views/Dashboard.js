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
  const [contentTitle, setContentTitle] = React.useState('Please Connect to Xero');
  const [displayContentText, setDisplayContentText] = React.useState('Please authenticate to explore the tutorial. This tutorial will show developers how to utilise our API endpoints with the "xero-node" SDK version in package.json. WARNING! This tutorial will Create, Read, Update and Delete REAL objects in the authenticated Xero organisation. Please only authenticate with a Demo Company or a non-production organisation.')

  const connectToXero = async() => {
    fetch('/api/connect')
    .then( (response) => response.json())
    .then(async data => {
      location.assign(data.consentUrl);
    })
    .catch(err => console.log(err))
  }
  
  const getOrganisations = () => {
    fetch('/api/organisations')
    .then((response) => response.json()
    )
    .then(data => 
      { 
        setContentTitle("Get Organisations Response");
        setDisplayContentText(JSON.stringify(data.organisations[0], null, 2));
      })
    .catch(err => console.log(err))
  }

  const getAccounts = () => {
    fetch('/api/accounts')
    .then((response) => response.json())
    .then(data => 
      {
        setContentTitle("Get Accounts Response");
        setDisplayContentText(JSON.stringify(data.accounts[0], null, 2));
      })
    .catch(err => console.log(err))
  }

  const getContacts = () => {
    fetch('/api/contacts')
    .then((response) => response.json())
    .then(data => 
      {
        setContentTitle("Get Contacts Response");
        setDisplayContentText(JSON.stringify(data.contacts[0], null, 2));
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
                      width: '55vw',
                      marginLeft: 'auto',
                      marginRight: 'auto',
                      paddingX: '12px',
                      paddingY: '8px'
                    }}>
                      <ResponseDisplay contentTitle={contentTitle} displayContent={displayContentText}></ResponseDisplay>
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