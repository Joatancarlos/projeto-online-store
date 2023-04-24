import React from 'react';
import PropTypes from 'prop-types';
import './Review.css';
/* Apagar {' '} e <br /> após CSS */

class ReviewForm extends React.Component {
  state = {
    email: '',
    rating: 0,
    text: '',
    validReview: false,
    submitClicked: false,
  };

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [name]: value });
  };

  rate = (event, star) => {
    event.preventDefault();
    this.setState({ rating: star });
  };

  validateReview = () => {
    this.setState({ submitClicked: true }, () => {
      const { email, rating } = this.state;
      const validationEmailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{3,4}$/;
      const validEmail = validationEmailRegex.test(email);
      const validReview = validEmail && rating > 0;
      this.setState({ validReview }, () => {
        if (validReview) this.saveReview();
      });
    });
  };

  saveReview = () => {
    let reviews = [];
    const { productId } = this.props;
    const { email, rating, text } = this.state;
    const review = { email, text, rating };
    const previousReviews = localStorage.getItem(`${productId}`);
    if (previousReviews) reviews = JSON.parse(previousReviews);
    reviews.push(review);
    localStorage.setItem(`${productId}`, JSON.stringify(reviews));
    this.setState(
      { email: '', rating: 0, text: '', validReview: false, submitClicked: false },
    );
  };

  submitReview = (event) => {
    event.preventDefault();
    this.validateReview();
  };

  render() {
    const { productId } = this.props;
    const { email, rating, text, validReview, submitClicked } = this.state;
    const stars = ['1', '2', '3', '4', '5'];
    const reviews = JSON.parse(localStorage.getItem(`${productId}`));
    return (
      <form>
        <fieldset>
          <legend>De seu feeedback sobre o produto!</legend>
          <label htmlFor="email">
            Email:
            <input
              data-testid="product-detail-email"
              type="email"
              name="email"
              id="email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          {' '}
          <br />
          <br />
          Avaliação:
          {
            stars.map((star) => {
              const starColor = rating >= star ? 'yellow' : 'gray';
              return (
                <button
                  key={ star }
                  onClick={ (event) => this.rate(event, star) }
                  className="starBtn"
                >
                  <i
                    data-testid={ `${star}-rating` }
                    className="fa-solid fa-star"
                    style={ { color: starColor } }
                  />
                </button>
              );
            })
          }
          {' '}
          <br />
          <br />
          <div>
            <label htmlFor="text">
              Comentários:
              {' '}
              <br />
              <textarea
                data-testid="product-detail-evaluation"
                name="text"
                id="text"
                cols="25"
                rows="5"
                value={ text }
                onChange={ this.handleChange }
              />
            </label>
            {' '}
            <br />
            <button
              data-testid="submit-review-btn"
              onClick={ (event) => this.submitReview(event) }
            >
              Enviar
            </button>
          </div>
        </fieldset>
        {
          validReview
            ? (<p>Agradecemos pelo feedback!</p>)
            : (submitClicked && <p data-testid="error-msg">Campos inválidos</p>)
        }
        {
          reviews !== null && (
            <section className="reviews">
              {
                reviews.map((review) => (
                  <div key={ review.email }>
                    <h5 data-testid="review-card-email">{ review.email }</h5>
                    <div data-testid="review-card-rating">
                      {
                        Array.from({ length: review.rating }, (_, idx) => (
                          <i
                            key={ idx }
                            className="fa-solid fa-star"
                            style={ { color: 'yellow' } }
                          />
                        ))
                      }
                    </div>
                    <p data-testid="review-card-evaluation">{ review.text }</p>
                  </div>
                ))
              }
            </section>
          )
        }
      </form>
    );
  }
}

ReviewForm.propTypes = {
  productId: PropTypes.string.isRequired,
};

export default ReviewForm;
