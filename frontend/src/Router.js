import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Toast from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";

import Header from "./components/Header";
import { useToastMessage } from "./context/ToastContext";
import { useUser } from "./context/UserContext";
import Login from "./pages/Login";
import ShoppingList from "./pages/ShoppingList";

const Router = () => {
  const { toastMessage, setToastMessage } = useToastMessage();

  const handleCloseToastMessage = (event, reason) => {
    setToastMessage((prevState) => ({ ...prevState, show: false }));
  };

  return (
    <>
      <Header />
      <BrowserRouter>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute path="/">
            <ShoppingList />
          </PrivateRoute>
        </Switch>
      </BrowserRouter>
      <Toast
        open={toastMessage.show}
        autoHideDuration={6000}
        onClose={handleCloseToastMessage}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        TransitionComponent={(props) => <Slide {...props} direction="left" />}
        key="toast-slide"
      >
        <Alert
          elavation={6}
          variant="filled"
          onClose={handleCloseToastMessage}
          severity={toastMessage.type}
        >
          {toastMessage.message}
        </Alert>
      </Toast>
    </>
  );
};

export default Router;

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, ...rest }) {
  let { user } = useUser();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user?.id ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
