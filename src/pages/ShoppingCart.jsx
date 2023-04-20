import React from 'react';
import '../Home.css';

class ShoppingCart extends React.Component {
  state = {
    cart: [],
    //    quantity: '',
  };

  componentDidMount() {
    const productsAdded = JSON.parse(localStorage.getItem('cart'));
    this.setState({ cart: productsAdded });

    // handleClickMore = () => {
    //   const { cart, quantity } = this.state;
    //   this.setState({ quantity: { ...quantity },
    //   });
    // };
  }

  render() {
    const { cart } = this.state;
    console.log(cart);
    return (
      <>
        <div />
        {
          cart !== null
            ? (
              cart.map((product) => {
                const { id, title, price } = product;
                console.log(product);
                return (
                  <div key={ id } className="product">
                    <h4 data-testid="shopping-cart-product-name">
                      { title }
                    </h4>
                    <h4>
                      { price }
                    </h4>
                    <h4 data-testid="shopping-cart-product-quantity">1</h4>
                  </div>
                );
              })
            )
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
