import React, { Component } from 'react';
import { connect } from 'react-redux'
import serializeForm from 'form-serialize'
import { Redirect } from 'react-router-dom'

import { idGenerator } from '../utils/helpers'
import { handleAddPost } from '../actions/posts'
import { handleGetAllCategories } from '../actions/categories'

class CreatePost extends Component {

  componentDidMount() {
    this.props.dispatch(handleGetAllCategories())
  }

  state = {
    toHome: false,
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const formValues = serializeForm(e.target, { hash: true })

    const postPayload = {
      ...formValues,
      id: idGenerator(),
      timestamp: + new Date(),
    }

    this.props.dispatch(handleAddPost(postPayload))

    this.setState(() => ({
      toHome: true
    }))
  }

  render() {
    const { categories } = this.props

    const { toHome } = this.state

    if (toHome) {
      return <Redirect to={'/'} />
    }

    return (
      <div className="post-cards col-md-8">
        <div className="card mb-4">
          <div className="card-body">
            <h2>Create Post</h2>
            <hr></hr>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label for="title">Title</label>
                <input type="text" className="form-control" name="title" placeholder="Title" required />
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label for="author">Author</label>
                  <input type="text" className="form-control" name="author" placeholder="Author" required />
                </div>
                <div className="form-group col-md-6">
                  <label for="category">Category</label>
                  <select name="category" className="form-control">
                    {categories.length > 0 ? (
                      categories.map((category) => (
                        <option value={category.name} key={category.name}>{category.name}</option>
                      ))
                    ) : <option>--</option>
                    }
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label for="post">Post</label>
                <textarea className="form-control" rows="4" name="body" placeholder="Post" required />
              </div>
              <button className="btn btn-outline-info formBtn" >Add Post</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ categories }) {
  return {
    categories
  }
}

export default connect(mapStateToProps)(CreatePost)