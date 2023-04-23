import { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductById } from '../services/api';
import Review from '../components/Review';

class Details extends Component {
  state = {
    product: {},
  };

  componentDidMount() {
    this.fetchProduct();
  }

  fetchProduct = async () => {
    const { match: { params: { id } } } = this.props;
    const product = await getProductById(id);
    this.setState({ product });
  };

  render() {
    const { add2Cart, match: { params: { id } } } = this.props;
    const { product } = this.state;
    return (
      <main>
        <Link to="/">Voltar</Link>
        <div>
          <h3 data-testid="product-detail-name">{ product.title }</h3>
          <img
            src={ product.thumbnail }
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
            { product.price }
          </span>
          <Link to="/carrinho-de-compras" data-testid="shopping-cart-button">
            Carrinho de Compras
          </Link>
          <button
            data-testid="product-detail-add-to-cart"
            onClick={ () => add2Cart(product) }
            className="btn"
          >
            Adicionar
          </button>
        </div>
        <Review productId={ id } />
      </main>
    );
  }
}

Details.propTypes = {
  add2Cart: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Details;
