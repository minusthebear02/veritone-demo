import React, { useState } from 'react'
import styled from 'styled-components'
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import AccountCircle from '@mui/icons-material/AccountCircle';

import { useUser } from '../context/UserContext';

const Header = () => {

  const { user, logoutUser } = useUser()

  const [anchorEl, setAnchorEl] = useState( null )

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logoutUser()
    handleClose()
  }

    return (
      <Box sx={{ flexGrow: 1 }}>
        <StyledAppBar position="fixed">
          <Typography variant="h6" component="h1">
            SHOPPING LIST
          </Typography>
          {user?.id && (
            <>
              <Button
                size="large"
                aria-label="options of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                startIcon={<AccountCircle />}
              >
                Hey, { user.name }
              </Button>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={!!anchorEl}
                onClose={handleClose}
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          )}
        </StyledAppBar>
      </Box>
    );
}

export default Header

const StyledAppBar = styled( AppBar )`
 padding: 0 30px;
 display: flex;
 justify-content: space-between;
 align-items: center;
 flex-direction: row;

 h1 {
     font-weight: 600;
     line-height: 23px;
     letter-spacing: 0.25px;
     padding: 20px 0;
 }
`
