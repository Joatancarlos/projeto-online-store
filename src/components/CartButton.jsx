import React from 'react';
import { Link } from 'react-router-dom';

class CartButton extends React.Component {
  render() {
    const cartSize = JSON.parse(localStorage.getItem('cartSize'));
    return (
      <div>
        <Link to="/carrinho-de-compras" data-testid="shopping-cart-button">
          Carrinho de Compras
        </Link>
        <div data-testid="shopping-cart-size">{ cartSize }</div>
      </div>
    );
  }
}

export default CartButton;
