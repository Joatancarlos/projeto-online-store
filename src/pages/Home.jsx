import React from 'react';
import { Link } from 'react-router-dom';
import { getProductsFromCategoryAndQuery } from '../services/api';
import Categories from './Categories/Categories';

class Home extends React.Component {
  state = {
    query: '',
    products: [],
    searched: false,
  };

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [name]: value });
  };

  handleClick = async () => {
    const { query } = this.state;
    const produtos = await getProductsFromCategoryAndQuery(undefined, query);
    this.setState({ products: produtos.results, searched: true });
  };

  render() {
    const { query, products, searched } = this.state;
    return (
      <>
        {/* Requisito 2 - Listagem de produtos */}
        <div>
          <label htmlFor="query">
            <input
              data-testid="query-input"
              name="query"
              value={ query }
              type="text"
              onChange={ this.handleChange }
            />
          </label>
          <button
            data-testid="query-button"
            onClick={ () => this.handleClick() }
          >
            Pesquisar
          </button>
          <Link to="/carrinho-de-compras" data-testid="shopping-cart-button">
            Carrinho de Compras
          </Link>
        </div>
        <Categories />
        {
          query.length > 0
            ? (
              <p> </p>
            ) : (
              <p data-testid="home-initial-message">
                Digite algum termo de pesquisa ou escolha uma categoria.
              </p>
            )
        }

        {
          products.length > 0
            ? (products.map((produto) => (
              <div key={ produto.id }>
                <h4 data-testid="product">
                  { produto.title }
                </h4>
                <img
                  data-testid="product"
                  src={ produto.thumbnail }
                  alt={ produto.title }
                />
                <h4 data-testid="product">
                  { produto.price }
                </h4>
              </div>
            )))
            : (searched && (<p>Nenhum produto foi encontrado</p>))
        }
      </>
    );
  }
}

export default Home;
