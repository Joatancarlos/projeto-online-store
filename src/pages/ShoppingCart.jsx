import React from 'react';

class ShoppingCart extends React.Component {
  state = {
  cart: '',
};

render() {
  const { cart } = this.state;
    return (
      <>
        <div />
        {
          cart
            ? { cart }
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
