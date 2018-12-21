import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import '../components/App.css'
import { handleGetAllCategories } from '../actions/categories'
import Category from '../components/category'
import { MdSentimentVeryDissatisfied } from 'react-icons/md'

class SideBar extends Component {

  componentDidMount() {
    this.props.dispatch(handleGetAllCategories());
  }

  render() {
    const {categories} = this.props
  
    return (
      <div className="col-md-4">
        <div className="card my-4">
          <h5 className="card-header">Categories</h5>
          <div className="card-body">
            <div className="row">
              <div className="col-lg-6">
                <ul className="list-unstyled mb-0">
                  {categories.length > 0 ? (
                    categories.map(category => (
                   <Category key={category.name} category={category} />
                    ))
                  ) :
                    <span className='content-not-found'>
                      <MdSentimentVeryDissatisfied className='content-not-found-icon' />
                    </span>
                  }
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ categories }, props) {
  const { pathname } = props.location;
  return {
    categories,
    pathname,
  };
}

export default withRouter(connect(mapStateToProps)(SideBar));


