/*
import React from 'react';
import PropTypes from 'prop-types';

class CategoryList extends React.Component {
  render() {
    const { categoryList } = this.props;
    return (
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
                />
                { `${category.name}` }
              </label>
            </li>
          ))
        }
      </ul>
    );
  }
}

CategoryList.propTypes = {
  categoryList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default CategoryList;
*/
