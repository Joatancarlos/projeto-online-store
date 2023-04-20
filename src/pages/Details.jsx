import { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductById } from '../services/api';

class Details extends Component {
  state = {
    productId: {},
  };

  componentDidMount() {
    this.fetchProduct();
  }

  fetchProduct = async () => {
    const { match: { params: { id } } } = this.props;
    const productId = await getProductById(id);
    this.setState({
      productId,
    });
  };

  render() {
    const { productId } = this.state;
    return (
      <main>
        <Link to="/">Voltar</Link>
        <div>
          <h3 data-testid="product-detail-name">{ productId.title }</h3>
          <img
            src={ productId.thumbnail }
            alt="imagem do produto"
            data-testid="product-detail-image"
          />
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
            { productId.price }
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
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Details;
