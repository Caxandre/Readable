import React, { Component } from 'react'
import '../App.css'
import { Link } from 'react-router-dom'

class NavBar extends Component {
  render() {
    return (
      < nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" >
        <div className="container">
          <Link to='/' className="navbar-brand">
            Readable
        </Link>

          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <Link to='/' className="nav-link">
                  Home
                  </Link>
              </li>
              <li className="nav-item">
                <Link to='/new' className='nav-link'>
                  Create Post
              </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav >

    )
  }
}

export default NavBar


