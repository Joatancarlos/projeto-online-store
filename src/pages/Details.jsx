import { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductById } from '../services/api';

class Details extends Component {
  state = {
    productInformation: {},
  };

  componentDidMount() {
    this.fetchProduct();
  }

  fetchProduct = async () => {
    const { product } = this.props;
    const { params: { id } } = product;
    const productInformation = await getProductById(id);
    this.setState({ productInformation });
  };

  render() {
    const { productInformation: { title, price, thumbnail } } = this.state;

    return (
      <main>
        <Link to="/">Voltar</Link>
        <div>
          <h3 data-testid="product-detail-name">{ title }</h3>
          <img src={ thumbnail } alt={ title } data-testid="product-detail-image" />
        </div>
        <div>
          <h3>Especificações Técncas</h3>
          <ul>
            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
          </ul>
          <span data-testid="product-detail-price">
            { `R$ ${price}` }
          </span>
          <Link to="/carrinho-de-compras" data-testid="shopping-cart-button">
            <button type="button" name="shopping-cart-btn"> 🛍  </button>
          </Link>
        </div>
      </main>
    );
  }
}

Details.propTypes = {
  product: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default Details;
