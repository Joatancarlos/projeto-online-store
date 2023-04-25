import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CartButton from './CartButton';

export default class Search extends Component {
  render() {
    const {
      query,
      handleChange,
      handleSearch,
    } = this.props;
    return (
      <div className="search">
        <div className="div-input">
          <input
            data-testid="query-input"
            className="input-search"
            name="query"
            placeholder="Pesquise aqui!"
            value={ query }
            type="text"
            onChange={ handleChange }
          />
          <button
            data-testid="query-button"
            onClick={ () => handleSearch() }
            className="btn"
          >
            <span>Pesquisar  </span>
            <i className="fa-solid fa-magnifying-glass" />
          </button>
        </div>
        <CartButton />
      </div>
    );
  }
}

Search.propTypes = {
  query: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
};
