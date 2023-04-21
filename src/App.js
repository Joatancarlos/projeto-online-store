import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import ShoppingCart from './pages/ShoppingCart';
import Details from './pages/Details';
import '@fortawesome/fontawesome-free/css/all.min.css';

class App extends React.Component {
  add2Cart = async (product) => {
    let cartArray = [];
    const cart = localStorage.getItem('cart');
    if (cart) { cartArray = JSON.parse(cart); }
    cartArray.push(product);
    localStorage.setItem('cart', JSON.stringify(cartArray));
  };

  render() {
    return (
      <Switch>
        <Route exact path="/" render={ () => <Home add2Cart={ this.add2Cart } /> } />
        <Route exact path="/carrinho-de-compras" component={ ShoppingCart } />
        <Route
          exact
          path="/detalhes-do-produto/:id"
          render={ (props) => <Details { ...props } add2Cart={ this.add2Cart } /> }
        />
      </Switch>
    );
  }
}

export default App;
