import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { handleGetPost } from '../actions/posts'
import { handleGetComments, handleAddPostComment, handleDeleteComment } from '../actions/comments'
import { idGenerator } from '../utils/helpers'
import serializeForm from 'form-serialize'
import SinglePost from '../components/singlePost'
import CreateComment from '../components/createComment'
import CommentList from '../components/commentList'
import PageNotFound from '../components/layout/pageNotFound'

class PostPage extends Component {

  componentDidMount() {
    const { id } = this.props;
    this.props.dispatch(handleGetPost(id));
    this.props.dispatch(handleGetComments(id));
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { id } = this.props.match.params
    const formValues = serializeForm(e.target, { hash: true })
 console.log("lksndlngls > ", formValues)
    const commentPayload = {
      ...formValues,
      id: idGenerator(),
      timestamp: + new Date(),
      parentId: id
    }
    this.props.dispatch(handleAddPostComment(commentPayload))
  }

  handleDelete = id => {
    this.props.dispatch(handleDeleteComment(id));
  };

  render() {

    const { postExist } = this.props

    return (
      <div className="post-cards col-md-8">
        {!postExist
          ?
          <PageNotFound />
          :
          <Fragment>
            <SinglePost singlePost={this.props.post} />
            <CreateComment handleSubmit={this.handleSubmit} />
            <CommentList comments={this.props.comments} handleDelete={this.handleDelete} />
          </Fragment>
        }
      </div>
    )
  }
}

function mapStateToProps({ post, comments }, props) {

  const { category, id } = props.match.params;

  return {
    post,
    category,
    id,
    comments,
    postExist: post.id ? true : false
  };
}

export default connect(mapStateToProps)(PostPage)

