import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MsgBuscar extends Component {
  render() {
    const {
      query,
    } = this.props;
    return (
      <div>
        {
          query.length > 0
            ? (
              <p> </p>
            ) : (
              <p data-testid="home-initial-message" className="search-msg">
                Digite algum termo de pesquisa ou escolha uma categoria.
              </p>
            )
        }
      </div>
    );
  }
}

MsgBuscar.propTypes = {
  query: PropTypes.string.isRequired,
};
