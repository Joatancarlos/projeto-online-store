import React from 'react';
import { Link } from 'react-router-dom';
import Cart from '../components/Cart';
import './Home.css';
import './ShoppingCart.css';

class ShoppingCart extends React.Component {
  state = { cart: [] };

  componentDidMount() {
    const productsAdded = JSON.parse(localStorage.getItem('cart'));
    if (productsAdded !== null) this.setState({ cart: productsAdded });
  }

  render() {
    const { cart } = this.state;
    return (
      <section className="shopping-cart">
        {
          cart.length > 0
            ? (<Cart />)
            : (
              <span
                data-testid="shopping-cart-empty-message"
              >
                Seu carrinho está vazio
              </span>
            )
        }
        <Link
          to="/checkout"
          data-testid="checkout-products"
          className="btn"
        >
          Finalizar pedido
        </Link>
      </section>
    );
  }
}

export default ShoppingCart;
