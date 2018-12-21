import React, { Component } from 'react';
import { connect } from 'react-redux'

class CreateComment extends Component {

  render() {
    const { handleSubmit } = this.props

    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="author">Author</label>
          <input
            type="text"
            className="form-control"
            name="author"
            placeholder="Type your name..."
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="body">Body</label>
          <textarea
            className="form-control"
            rows="4"
            placeholder="Type the comment body..."
            name="body"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="btn btn-outline-info"

        >Add Comment</button>
      </form>
    )
  }
}

export default connect()(CreateComment)