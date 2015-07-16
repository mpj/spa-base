import $ from 'jquery'

// Bootstrap js is stuck in 2009 so it wants globals
global.jQuery = $

// Babel can polyfill ES6 stuff for us, such
// as cool things like fetch and native Promises:
import 'babelify/polyfill'

import api from './api'

import {element,tree,render} from 'deku'

// Babel allows us to use ES6 imports, here we are
// import the default exported object from my-list.js
// into the variable MyListComponent
import MyList from './components/my-list'

// when DOM is ready, execute the function passed to ready()
// see docs at https://api.jquery.com/ready/
$().ready(() => {
  // DOM node with id render-target will be where we render
  // all out stuff into
  let target = document.getElementById('render-target')

  // Pass the api object as a property into MyList
  // (this makes it easy to mock api for testing)
  // and then render MyList into the target
  let myList = <MyList api={api} />
  var app = tree(myList)
  render(app, target)


})
