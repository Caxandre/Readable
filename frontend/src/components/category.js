import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import './App.css'

export default function Category(props) {
  return (
    <li key={props.category.name} className="category-item">
      <NavLink exact to={`/${props.category.path}`} style={{ textDecoration: 'none' }} className="category-item-link active">
        {props.category.name}
      </NavLink>
    </li>
  )
} 