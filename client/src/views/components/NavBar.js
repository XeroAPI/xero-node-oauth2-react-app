import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Button } from '@mui/material';

const NavBar = (props) => {
    const AppBar = styled(MuiAppBar, {
      shouldForwardProp: (prop) => prop !== 'open',
    })(({ theme, open }) => ({
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      ...(open && {
        marginLeft: props.drawerWidth,
        width: `calc(100% - ${props.drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      }),
    }));

    return (
        <AppBar position="absolute" open={open}>
            <Toolbar>
            <Button 
                variant='contained'
                onClick={props.connectToXero}
                disabled={props.connectButtonIsDisabled}
                sx={{
                marginRight: '24px'
                }}
                >
                {props.connectButtonText}
            </Button>
            </Toolbar>
        </AppBar>
    )
}

export default NavBar;
