import React, { Component, Fragment } from 'react'
import './App.css'
import { connect } from 'react-redux'
import { formatDate } from '../utils/helpers'
import { TiTrash, TiEdit } from 'react-icons/ti'
import { Link, withRouter, Redirect } from 'react-router-dom'
import VoteScore from './voteScore'
import { handleRemovePost } from '../actions/posts'

class SinglePost extends Component {

  state = {
    toHome: false,
  }

  removePost(e, post) {
    e.preventDefault()

    this.props.dispatch(handleRemovePost(post))


    this.setState(() => ({
      toHome: true
    }))
  }

  render() {

    const { toHome } = this.state

    if (toHome) {
      return <Redirect to={'/'} />
    }

    const {
      title,
      author,
      body,
      timestamp,
      voteScore,
      id,
    } = this.props.singlePost;

    const singlePost = this.props.singlePost

    return (
      <Fragment>
        <div>
          <h1 className="mt-4">{title}</h1>
          <p className="lead"> by {author}</p>
          <hr></hr>
          <p>{formatDate(timestamp)}</p>
          <hr></hr>
          <p>{body}</p>
          <div className="post-info">
            <VoteScore initialScore={voteScore} data={singlePost} type={'post'} /> |
            <Link to={{ pathname: `/post/edit/${id}`, state: { singlePost } }}>
              <TiEdit className="edit-icon" data-toggle="tooltip" data-placement="top" title="Tooltip on top" />
            </Link> |
            <Link to='' onClick={(e) => this.removePost(e, singlePost)}>
              <TiTrash className="trash-icon" />
            </Link>
          </div>
          <hr></hr>
        </div>
      </Fragment>
    )
  }
}

function mapStateToProps({ posts, post }) {
  return {
    posts,
    post,
  };
}

export default withRouter(connect(mapStateToProps)(SinglePost)) 
