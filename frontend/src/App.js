import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles'
import { QueryClient, QueryClientProvider } from 'react-query';
import CssBaseline from '@mui/material/CssBaseline';

import { theme } from './theme';
import Router from './Router';
import { UserProvider } from './context/UserContext';

const queryClient = new QueryClient()

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <Router />
        </UserProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
