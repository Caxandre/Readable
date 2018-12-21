import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TiThumbsUp, TiThumbsDown } from 'react-icons/ti'
import { handleUpdatePostVoteScore } from '../actions/posts'
import { handleUpdateCommentScore } from '../actions/comments'

class VoteScore extends Component {
  voteOptions = {
    upVote: 'upVote',
    downVote: 'downVote',
  }

  state = {
    initialScore: this.props.initialScore
  }

  updateVoteScore(option) {
    const { type, data } = this.props

    const voteScore = {
      option,
      id: data.id
    }

    this.setState((state) => ({
      initialScore: option === this.voteOptions.upVote ? state.initialScore + 1 : state.initialScore - 1
    }))

    type === 'post' ? this.props.dispatch(handleUpdatePostVoteScore(voteScore)) : this.props.dispatch(handleUpdateCommentScore(voteScore))
  }

  render() {
    const { initialScore } = this.state

    return (
      <div className="vote-icons">
        <TiThumbsUp className='vote-icon-up' onClick={() => this.updateVoteScore(this.voteOptions.upVote)} />
        {initialScore > 0
          ? <span className="badge badge-danger counter-vote"> {initialScore} </span>
          : <span className="badge badge-secondary counter-vote"> {initialScore} </span>
        }
        <TiThumbsDown className='vote-icon-down' onClick={() => this.updateVoteScore(this.voteOptions.downVote)} />
      </div>
    )
  }
}

export default connect()(VoteScore)