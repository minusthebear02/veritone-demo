import React from 'react'
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';

const Header = () => {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" sx={{ padding: '20px 30px'}}>
          <Typography variant="h6" component="h1" sx={{ fontWeight: '600', lineHeight: '23px' }}>
            SHOPPING LIST
          </Typography>
        </AppBar>
      </Box>
    );
}

export default Header
