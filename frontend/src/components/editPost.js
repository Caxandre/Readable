import React, { Component } from 'react';
import { connect } from 'react-redux'
import serializeForm from 'form-serialize'
import { Redirect } from 'react-router-dom'
import { handleUpdatePost } from '../actions/posts'

class EditPost extends Component {

  state = {
    ...this.props.location.state.singlePost,
    toHome: false,
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const postUpdated = { ...serializeForm(e.target, { hash: true }), id: this.state.id }

    this.props.dispatch(handleUpdatePost(postUpdated))

    this.setState(() => ({
      toHome: true
    }))
  }

  handleChangeTitle = e => {
    this.setState({ title: e.target.value });
  }

  handleChangeBody = e => {
    this.setState({ body: e.target.value })
  }


  render() {
    const { title, body, toHome, id } = this.state

    if (toHome) {
      return <Redirect to={`/post/${id}`} />
    }

    return (
      <div className="post-cards col-md-8">
        <div className="card mb-4">
          <div className="card-body">
            <h2>Edit Post</h2>
            <hr></hr>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input type="text" className="form-control" name="title" value={title} onChange={this.handleChangeTitle} required />          </div>
              <label htmlFor="post">Post</label>
              <textarea className="form-control" name="body" value={body} onChange={this.handleChangeBody} required />
              <button className="btn btn-outline-info formBtn" >Edit Post</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default connect()(EditPost)