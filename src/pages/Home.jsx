import React from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import '../Home.css';

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

  handleClickRatio = ({ target: { id } }) => {
    this.setState({ category: id, query: '' }, async () => {
      await this.handleSearch();
    });
  };

  add2Cart = async (product) => {
    let cartArray = [];
    const cart = localStorage.getItem('cart');
    if (cart) { cartArray = JSON.parse(cart); }
    cartArray.push(product);
    localStorage.setItem('cart', JSON.stringify(cartArray));
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
        <div className="search">
          <label htmlFor="query">
            <input
              data-testid="query-input"
              className="input-search"
              name="query"
              value={ query }
              type="text"
              onChange={ this.handleChange }
            />
          </label>
          <button
            data-testid="query-button"
            onClick={ () => this.handleSearch() }
            className="btn"
          >
            Pesquisar
          </button>
          <Link to="/carrinho-de-compras" data-testid="shopping-cart-button">
            Carrinho de Compras
            <i className="fa-regular fa-cart-shopping" />

          </Link>
        </div>
        <p>Categorias:</p>
        <ul className="list">
          {
            categoryList.map((category) => (
              <li key={ category.id }>
                <label
                  data-testid="category"
                  htmlFor={ category.id }
                >
                  <input
                    type="radio"
                    value={ `${category.name}` }
                    name="category"
                    id={ category.id }
                    onClick={ this.handleClickRatio }
                  />
                  {`${category.name}`}
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
        <div className="list-products">
          {
            products.length > 0
              ? (products.map((produto) => (
                <div className="product" key={ produto.id }>
                  <Link
                    to={ `/detalhes-do-produto/${produto.id}` }
                    data-testid="product-detail-link"
                  >
                    <div data-testid="product">
                      <h4>
                        {produto.title}
                      </h4>
                      <img
                        src={ produto.thumbnail }
                        alt={ produto.title }
                      />
                      <h5>
                        {`R$ ${produto.price}`}
                      </h5>
                    </div>
                  </Link>
                  <button
                    data-testid="product-add-to-cart"
                    onClick={ () => this.add2Cart(produto) }
                    className="btn"
                  >
                    Adicionar
                  </button>
                </div>
              )))
              : (searched && (<p>Nenhum produto foi encontrado</p>))
          }

        </div>
      </>
    );
  }
}

export default Home;
