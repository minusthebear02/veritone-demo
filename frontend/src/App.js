import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "react-query";
import CssBaseline from "@mui/material/CssBaseline";

import { theme } from "./theme";
import Router from "./Router";
import { UserProvider } from "./context/UserContext";
import { ToastMessageProvider } from "./context/ToastContext";
import { ItemProvider } from "./context/ItemContext";

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <ToastMessageProvider>
          <UserProvider>
            <ItemProvider>
              <Router />
            </ItemProvider>
          </UserProvider>
        </ToastMessageProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
