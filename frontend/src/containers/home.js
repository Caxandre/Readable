import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { handleGetAllPosts } from '../actions/posts'
import '../components/App.css'
import Post from '../components/post'
import PostNotFound from '../components/layout/postNotFound'
import SortBy from '../components/sortBy'
class Home extends Component {

  componentDidMount() {
    this.props.dispatch(handleGetAllPosts(this.props.category));
  }

  state = {
    order: null,
  }

  componentDidUpdate(prevProps) {
    if (this.props.category !== prevProps.category) {
      this.props.dispatch(handleGetAllPosts(this.props.category));
    }
  }

  handleOptionChange = (e) => {
    e.preventDefault()
    this.setState({
      order: e.target.value
    });
  }

  render() {
    const { posts } = this.props

    let sortedPosts = posts

    console.log('LOG 02 -> ', sortedPosts)

    if (this.state.order === 'byDate') {
      sortedPosts = !this.state.order ? posts : [...posts].sort((a, b) => b.timestamp - a.timestamp)
    } else if (this.state.order === 'byScore') {
      sortedPosts = !this.state.order ? posts : [...posts].sort((a, b) => b.voteScore - a.voteScore)
    } else if (this.state.order === 'byComments') {
      sortedPosts = !this.state.order ? posts : [...posts].sort((a, b) => b.commentCount - a.commentCount)
    } else if (this.state.order === 'byAuthor') {
      sortedPosts = !this.state.order ? posts : [...posts].sort((a, b) => a.author.localeCompare(b.author))
    } else {
      sortedPosts = posts
    }

    return (
      <Fragment>
        <div className="col-md-8">
          <SortBy
            order={this.state}
            sortedPosts={this.props.posts}
            handleOptionChange={this.handleOptionChange}
          />
        </div>
        <div className="post-cards col-md-8">

          {sortedPosts.length > 0 ? (
            sortedPosts.map(post => (
              <Post key={post.id} postData={post} />
            ))
          ) :
            <PostNotFound />
          }
        </div>
      </Fragment>
    )
  }
}

function mapStateToProps({ posts }, props) {
  const { category } = props.match.params;
  const { pathname } = props.location;

  return {
    posts: category ? posts.filter((post) => post.category === category) : posts,
    category,
    pathname,
  };
}

export default withRouter(connect(mapStateToProps)(Home));

