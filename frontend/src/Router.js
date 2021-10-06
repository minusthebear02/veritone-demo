import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Header from './components/Header'
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
                    <Route path="/">
                        <ShoppingList />
                    </Route>
                </Switch>
            </BrowserRouter>
        </>
    )
}

export default Router
