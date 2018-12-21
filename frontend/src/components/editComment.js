import React, { Component } from 'react'
import { connect } from 'react-redux'
import serializeForm from 'form-serialize'
import { Redirect } from 'react-router-dom'

import { handleEditPostComment } from '../actions/comments'

class EditComment extends Component {

  state = {
    toPostDetails: false,
    ...this.props.location.state.comment
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const commentUpdated = {
      ...serializeForm(e.target, { hash: true }),
      id: this.state.id,
      timestamp: + new Date(),
    }

    this.props.dispatch(handleEditPostComment(commentUpdated))

    this.setState(() => ({
      toPostDetails: true
    }))
  }

  handleChangeBody = e => {
    this.setState({ body: e.target.value })
  }

  render() {
    const { body, toPostDetails, parentId } = this.state

    if (toPostDetails) {
      return <Redirect to={`/post/${parentId}`} />
    }

    return (
      <div className="post-cards col-md-8">
        <div className="card mb-4">
          <div className="card-body">
            <h2>Edit Comment</h2>
            <hr></hr>
            <form onSubmit={this.handleSubmit}>
              <textarea className="form-control" rows="4" name="body" value={body} onChange={this.handleChangeBody} />
              <button className="btn btn-outline-info formBtn">Edit Comment</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default connect()(EditComment)