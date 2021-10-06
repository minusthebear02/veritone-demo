import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Header from './components/Header'
import { useUser } from './context/UserContext';
import Login from './pages/Login';
import ShoppingList from './pages/ShoppingList';

const Router = () => {

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
        </>
    )
}

export default Router

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, ...rest }) {
  let  {user } = useUser();
  return (
    <Route
      {...rest}
      render={({ location }) =>
          user?.id
              ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}
