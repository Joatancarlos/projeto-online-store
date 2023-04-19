import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import ShoppingCart from './pages/ShoppingCart';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route exact path="/carrinho-de-compras" component={ ShoppingCart } />
      </Switch>
    );
  }
}

export default App;
