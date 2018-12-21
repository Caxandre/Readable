import 'bootstrap/dist/css/bootstrap.min.css'
import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import './App.css'
import Home from '../containers/home'
import SideBar from '../containers/sideBar'
import Footer from './layout/footer'
import NavBar from './layout/navBar'
import CreatePost from './createPost'
import EditPost from './editPost'
import EditComment from './editComment'
import PostPage from '../containers/postPage'
import Messages from './layout/messages'
import LoadingBar from 'react-redux-loading'

class App extends Component {

  render() {
    return (
      <Router>
        <Fragment>
          <NavBar />
          <LoadingBar />
          <main role="main" className="container">
            <div className="main row">
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/new' component={CreatePost} />
                <Route exact path='/:category' component={Home} />
                <Route exact path='/:category/:id' component={PostPage} />
                <Route exact path='/post/edit/:id' component={EditPost} />
                <Route exact path='/comment/edit/:id' component={EditComment} />
              </Switch>
              <SideBar />
            </div>
          </main>
          <Footer />
          <Messages />
        </Fragment>
      </Router>
    );
  }
}


export default connect()(App)
