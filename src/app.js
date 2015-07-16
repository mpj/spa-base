import $ from 'jquery'

// Bootstrap js is stuck in 2009 so it wants globals
global.jQuery = $

// Babel can polyfill ES6 stuff for us, such
// as cool things like fetch and native Promises:
import 'babelify/polyfill'

import React from 'react'
import api from './api'

// Babel allows us to use ES6 imports, here we are
// import the default exported object from my-list.js
// into the variable MyListComponent
import MyListComponent from './components/my-list'

// when DOM is ready, execute the function passed to ready()
// see docs at https://api.jquery.com/ready/
$().ready(() => {
  // DOM node with id render-target will be where we render
  // all out stuff into
  let target = document.getElementById('render-target')

  // Pass the api object as a property into MyListComponent
  // (this makes it easy to mock api for testing)
  // and then render MyListComponent into the target
  React.render(<MyListComponent api={api} />, target)
})
