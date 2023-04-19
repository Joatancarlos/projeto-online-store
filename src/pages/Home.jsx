import React from 'react';
// import { getCategories, getProductsFromCategoryAndQuery } from './services/api';

class Home extends React.Component {
  state = {
    query: '',
  };

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [name]: value });
  };

  render() {
    const { query } = this.state;
    return (
      <>
        {/* Requisito 2 - Listagem de produtos */}
        <label htmlFor="query">
          <input
            name="query"
            value={ query }
            type="text"
            onChange={ this.handleChange }
          />
        </label>
        {
          query.length > 0
            ? (
              <p>{ query }</p>
            ) : (
              <p data-testid="home-initial-message">
                Digite algum termo de pesquisa ou escolha uma categoria.
              </p>
            )
        }
      </>
    );
  }
}

export default Home;
