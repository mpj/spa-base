import 'babelify/polyfill'
import $ from 'jquery'

import React from 'react'
import api from './api'

import MyListComponent from './components/my-list'

$().ready(() => {
  let target = document.getElementById('render-target')
  React.render(<MyListComponent api={api} />, target)
})
