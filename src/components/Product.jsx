import React from 'react';
import Proptypes from 'prop-types';
import '../pages/Home.css';

class Product extends React.Component {
  state = {
    quantity: 1,
  };

  handleQty = ({ target }) => {
    const { product } = this.props;
    const { name } = target;
    let { quantity } = this.state;
    let cartSize = JSON.parse(localStorage.getItem('cartSize'));
    if (name === 'increase' && quantity + 1 <= product.available_quantity) {
      quantity += 1;
      cartSize += 1;
    } else if (name === 'decrease') {
      quantity -= 1;
      cartSize -= 1;
      if (quantity <= 0) { quantity = 1; }
    }
    localStorage.setItem('cartSize', JSON.stringify(cartSize));
    this.setState({ quantity });
  };

  render() {
    const { product, removeProduct } = this.props;
    const { id, title, price } = product;
    const { quantity } = this.state;
    console.log(product);
    return (
      <div key={ id } className="product">
        <h4 data-testid="shopping-cart-product-name">
          { title }
        </h4>
        <h4>
          { price }
        </h4>
        <button
          name="increase"
          onClick={ (event) => this.handleQty(event) }
          data-testid="product-increase-quantity"
        >
          Adicionar
        </button>
        <button
          name="decrease"
          onClick={ (event) => this.handleQty(event) }
          data-testid="product-decrease-quantity"
        >
          Remove
        </button>
        <button
          id={ id }
          onClick={ (event) => removeProduct(event) }
          data-testid="remove-product"
        >
          X
        </button>
        <h4
          data-testid="shopping-cart-product-quantity"
        >
          { quantity }
        </h4>
      </div>
    );
  }
}

Product.propTypes = {
  id: Proptypes.string,
  title: Proptypes.string,
  price: Proptypes.string,
  product: Proptypes.object,
  removeProduct: Proptypes.func,
}.isRequired;

export default Product;
