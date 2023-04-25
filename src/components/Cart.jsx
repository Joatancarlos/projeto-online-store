import React from 'react';
import Product from './Product';

class Cart extends React.Component {
  state = {
    cart: [],
  };

  componentDidMount() {
    const productsAdded = JSON.parse(localStorage.getItem('cart'));
    if (productsAdded !== null) this.setState({ cart: productsAdded });
  }

  removeProduct = ({ target }) => {
    const { cart } = this.state;
    console.log(target);
    const produtoById = cart.find((item) => item.product.id === target.id);
    const removeIndex = cart.indexOf(produtoById);
    cart.splice(removeIndex, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    this.setState({ cart });

    let cartSize = 0;
    const cartSizeStorage = localStorage.getItem('cartSize');
    if (cartSizeStorage) cartSize = JSON.parse(cartSizeStorage);
    cartSize = cart.reduce((acc, cur) => cur.quantity + acc, 0);
    localStorage.setItem('cartSize', JSON.stringify(cartSize));
  };

  render() {
    const { cart } = this.state;
    return (
      <div>
        {
          cart !== null && (cart.map((item) => (
            <Product
              product={ item }
              removeProduct={ this.removeProduct }
              key={ item.product.id }
            />
          )))
        }
      </div>
    );
  }
}

export default Cart;
