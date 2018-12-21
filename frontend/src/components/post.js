import React, { Component } from 'react'
import './App.css'
import { connect } from 'react-redux'
import { formatDate } from '../utils/helpers'
import { Link, withRouter } from 'react-router-dom'
import VoteScore from './voteScore'
import { handleRemovePost } from '../actions/posts';
import { GoComment } from "react-icons/go";

class Post extends Component {

  handleDelete = id => {
    this.props.dispatch(handleRemovePost(id));
  };

  render() {
    const {
      title,
      author,
      category,
      commentCount,
      timestamp,
      voteScore,
      id
    } = this.props.postData;

    const postData = this.props.postData

    return (
      <div className="card mb-4">
        <div className="card-body">
          <Link to={`/${category}/${id}`} style={{ textDecoration: 'none' }}>
            <h4 className="card-title">{title}</h4>
          </Link>
          <div className="post-info">
            <h5><span className="cat-badge badge badge-warning">{category}</span></h5>
            |
            <Link to={`/${category}/${id}`}>
              {commentCount > 0
                ? <h5><span className="badge badge-info">{commentCount} <GoComment /></span></h5>
                : <h5><span className="badge badge-secondary">{commentCount} <GoComment /></span></h5>
              }
            </Link>
            |
            <VoteScore initialScore={voteScore} data={postData} type={'post'} />
          </div>
        </div>
        <div className="card-footer text-muted">
          Posted on {formatDate(timestamp)} by <span>{author}</span>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ posts, post }) {
  return {
    posts,
    post,
  };
}

export default withRouter(connect(mapStateToProps)(Post)) 
