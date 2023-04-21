import React from 'react';
import Product from '../components/Product';
import '../Home.css';

class ShoppingCart extends React.Component {
  state = {
    cart: [],
  };

  componentDidMount() {
    const productsAdded = JSON.parse(localStorage.getItem('cart'));
    this.setState({ cart: productsAdded });
  }

  removeProduct = ({ target }) => {
    const { cart } = this.state;
    const produtoById = cart.find((product) => product.id === target.id);
    const removeIndex = cart.indexOf(produtoById);
    cart.splice(removeIndex, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    this.setState({ cart });
  };

  render() {
    const { cart } = this.state;
    return (
      <>
        <div />
        {
          cart !== null
            ? (cart.map((product) => (
              <Product
                product={ product }
                removeProduct={ this.removeProduct }
                key={ product.id }
              />
            )))
            : (
              <span
                data-testid="shopping-cart-empty-message"
              >
                Seu carrinho está vazio
              </span>
            )
        }
      </>
    );
  }
}

export default ShoppingCart;
