import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class EmptyCart extends Component {
  render() {
    return (
      <div className="empty-cart">
        <p>Seu carrinho está vazio</p>
        <img src="../empty_cart.png" alt="carrinho vazio" />
        <p>Adicione produtos e tenha frete grátis.</p>
        <Link to="/" className="btn">
          Ver produtos
        </Link>
      </div>
    );
  }
}
