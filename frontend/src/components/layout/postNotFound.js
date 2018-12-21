import React, { Component } from 'react'
import '../App.css'

class PostNotFound extends Component {
  render() {
    return (
      <div id="notfound">
        <div className="notfound">
          <div className="notfound-404"></div>
          <h2>Oops!</h2>
          <p>Sorry, there are no posts to display!!</p>
        </div>
      </div>
    );
  }
}

export default PostNotFound;
