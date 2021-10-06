import React, { useState } from 'react'
import styled from 'styled-components'

import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Login = () => {
    const [isSignup, setIsSignup] = useState( 0 );

    const handleTabChange = ( event, newValue ) => {
        setIsSignup(newValue)
    }

    return (
        <Container>
            <Paper elevation={3} className="form-container">
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={isSignup}
                    onChange={handleTabChange}
                    aria-label="tab between sign up and log in"
                >
                    <Tab label="Log In"  />
                    <Tab label="Sign Up" />
                </Tabs>
                </Box>
            </Paper>
      </Container>
    );
}

export default Login

const Container = styled.div`
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;

    .form-container {
        width: 80%;
        max-width: 400px;
        padding: 25px;
    }
`
