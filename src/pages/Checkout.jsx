import React from 'react';
import PropTypes from 'prop-types';
import Cart from '../components/Cart';

class Checkout extends React.Component {
  state = {
    name: '',
    email: '',
    cpf: '',
    phone: '',
    cep: '',
    address: '',
    paymentMethod: '',
    inputsValidation: false,
    submitClicked: false,
  };

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [name]: value });
  };

  submitOrder = (hs) => {
    this.setState({ submitClicked: true }, () => {
      const { name, email, cpf, phone, cep, address, paymentMethod } = this.state;
      const valid = (input) => input.length > 0;
      const inputsValidation = valid(name) && valid(email) && valid(cpf) && valid(phone)
        && valid(cep) && valid(address) && valid(paymentMethod);
      this.setState({ inputsValidation }, () => {
        if (inputsValidation) {
          localStorage.setItem('cart', JSON.stringify([]));
          hs.push('/');
        }
      });
    });
  };

  render() {
    const { history } = this.props;
    const {
      name,
      email,
      cpf,
      phone,
      cep,
      address,
      inputsValidation,
      submitClicked,
    } = this.state;
    return (
      <div>
        <Cart />
        <fieldset>
          <label htmlFor="name">
            Nome Completo:
            <input
              data-testid="checkout-fullname"
              type="text"
              name="name"
              id="name"
              value={ name }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="email">
            Email:
            <input
              data-testid="checkout-email"
              type="email"
              name="email"
              id="email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="cpf">
            CPF:
            <input
              data-testid="checkout-cpf"
              type="text"
              name="cpf"
              id="cpf"
              value={ cpf }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="phone">
            Telefone:
            <input
              data-testid="checkout-phone"
              type="text"
              name="phone"
              id="phone"
              value={ phone }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="cep">
            CEP:
            <input
              data-testid="checkout-cep"
              type="text"
              name="cep"
              id="cep"
              value={ cep }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="address">
            Endereço:
            <input
              data-testid="checkout-address"
              type="text"
              name="address"
              id="address"
              value={ address }
              onChange={ this.handleChange }
            />
          </label>
          <fieldset>
            <legend>Método de pagamento</legend>
            <label htmlFor="paymentMethod">
              Boleto
              <input
                data-testid="ticket-payment"
                type="radio"
                name="paymentMethod"
                id="boleto"
                onClick={ () => this.setState({ paymentMethod: 'boleto' }) }
              />
            </label>
            <label htmlFor="paymentMethod">
              Visa
              <input
                data-testid="visa-payment"
                type="radio"
                name="paymentMethod"
                id="visa"
                onClick={ () => this.setState({ paymentMethod: 'visa' }) }
              />
            </label>
            <label htmlFor="paymentMethod">
              Master Card
              <input
                data-testid="master-payment"
                type="radio"
                name="paymentMethod"
                id="master"
                onClick={ () => this.setState({ paymentMethod: 'master' }) }
              />
            </label>
            <label htmlFor="paymentMethod">
              Elo
              <input
                data-testid="elo-payment"
                type="radio"
                name="paymentMethod"
                id="elo"
                onClick={ () => this.setState({ paymentMethod: 'elo' }) }
              />
            </label>
          </fieldset>
          <button
            data-testid="checkout-btn"
            onClick={ () => this.submitOrder(history) }
          >
            Finalizar compra
          </button>
        </fieldset>
        {
          (!inputsValidation && submitClicked)
          && <p data-testid="error-msg">Campos inválidos</p>
        }
      </div>
    );
  }
}

Checkout.propTypes = {
  history: PropTypes.objectOf({}).isRequired,
};

export default Checkout;
