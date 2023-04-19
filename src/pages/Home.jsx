import React from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';

class Home extends React.Component {
  state = {
    query: '',
    category: undefined,
    categoryList: [],
    products: [],
    searched: false,
  };

  componentDidMount() {
    this.fetchCategoryList();
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [name]: value });
  };

  handleSearch = async () => {
    const { query, category } = this.state;
    const produtos = await getProductsFromCategoryAndQuery(category, query);
    this.setState({ products: produtos.results, searched: true });
  };

  fetchCategoryList = () => {
    getCategories().then((response) => {
      this.setState({
        categoryList: response,
      });
    }).catch((error) => {
      console.log(error);
    });
  };

  render() {
    const { query, products, searched, categoryList } = this.state;
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
            onClick={ () => this.handleSearch() }
          >
            Pesquisar
          </button>
          <Link to="/carrinho-de-compras" data-testid="shopping-cart-button">
            Carrinho de Compras
          </Link>
        </div>
        <p>Categorias:</p>
        <ul>
          {
            categoryList.map((category) => (
              <li key={ category.id }>
                <label
                  data-testid="category"
                  htmlFor={ `${category.id}` }
                >
                  <input
                    type="radio"
                    value={ `${category.name}` }
                    name="category"
                    onChange={ this.handleChange }
                  />
                  { `${category.name}` }
                </label>
              </li>
            ))
          }
        </ul>
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
              <div key={ produto.id } data-testid="product">
                <h4>
                  { produto.title }
                </h4>
                <img
                  src={ produto.thumbnail }
                  alt={ produto.title }
                />
                <h4>
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
