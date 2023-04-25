import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MsgBuscar extends Component {
  render() {
    const {
      query,
    } = this.props;
    return (
      <p>
        {
          query.length > 0
            ? (
              <p> </p>
            ) : (
              <h4 data-testid="home-initial-message" className="search-msg">
                Digite algum termo de pesquisa ou escolha uma categoria.
              </h4>
            )
        }
      </p>
    );
  }
}

MsgBuscar.propTypes = {
  query: PropTypes.string.isRequired,
};
