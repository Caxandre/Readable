import React, { Component } from 'react'
import { connect } from 'react-redux'
import './App.css'

class SortBy extends Component {

  state = {
    order: null,
  }

  render() {
    const { order } = this.state
    const { handleOptionChange, sortedPosts } = this.props

    return (
      <div className="btn-group btn-group-toggle sortyBy">
        {sortedPosts.length > 0 && (
          <div>
            <label className="btn btn-outline-info btn-sm">
              <input type="radio" value="byDate" checked={order === 'byDate'} onChange={handleOptionChange} />
              Most Recents
            </label>
            <label className="btn btn-outline-info btn-sm">
              <input type="radio" value="byScore" checked={order === 'byScore'} onChange={handleOptionChange} />
              Most Voted
            </label>
            <label className="btn btn-outline-info btn-sm">
              <input type="radio" value="byComments" checked={order === 'byComments'} onChange={handleOptionChange} />
              Most Commented
            </label>
            <label className="btn btn-outline-info btn-sm">
              <input type="radio" value="byAuthor" checked={order === 'byAuthor'} onChange={handleOptionChange} />
              Author
            </label>
            <label className="btn btn-outline-info btn-sm">
              <input type="radio" value="allPosts" checked={order === 'allPosts'} onChange={handleOptionChange} />
              All Posts
            </label>
          </div>
        )
        }
      </div>

    );
  }
}

export default connect()(SortBy)
