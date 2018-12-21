import React, { Component } from 'react'
import './App.css'
import moment from 'moment';
import { Link } from 'react-router-dom'
import VoteScore from './voteScore'
import { TiTrash, TiEdit } from 'react-icons/ti'
import { GoComment } from "react-icons/go";

class CommentList extends Component {

  render() {

    const { comments, handleDelete } = this.props

    return (
      <div className="comment-list">
        <h5>Comments ({comments.length})</h5>
        <hr></hr>
        {comments.length > 0 ? (
          comments.map(comment => (
            <div className="media mb-4" key={comment.id}>
              <GoComment className="comment-icon" />
              <div className="media-body">
                <h5 className="mt-0">{comment.author}</h5>
                <small>{moment(comment.timestamp).format('LL')}</small>
                <p>  {comment.body}</p>
                <div className="post-info">
                  <VoteScore initialScore={comment.voteScore} data={comment} type={'comment'} /> |
                      <Link to={{ pathname: `/comment/edit/${comment.id}`, state: { comment } }}>
                    <TiEdit className="edit-icon" />
                  </Link > |
                      <span>
                    <TiTrash className="trash-icon" onClick={() => handleDelete(comment.id)} />
                  </span>
                </div>
                <hr></hr>
              </div>
            </div>
          ))
        ) : (
            <div className="media mb-4">
              <p>No comments yet. Be the first to comment!</p>
            </div>
          )}
      </div>
    );
  }
}

export default CommentList;
