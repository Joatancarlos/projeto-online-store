import React from 'react';
import { getCategories } from '../../services/api';
import CategoryList from './CategoryList';

class Categories extends React.Component {
  constructor() {
    super();
    this.state = {
      categoryList: [],
    };
  }

  componentDidMount() {
    this.fetchCategoryList();
  }

  fetchCategoryList() {
    getCategories().then((response) => {
      this.setState({
        categoryList: response,
      });
    }).catch((error) => {
      console.log(error);
    });
  }

  render() {
    const { categoryList } = this.state;
    return (
      <>
        <p>Categorias:</p>
        <CategoryList categoryList={ categoryList } />
      </>
    );
  }
}

export default Categories;
