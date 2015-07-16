import $ from 'jquery'
import React from 'react'
import 'babelify/polyfill'

$().ready(() => {

  fetch('http://jsonplaceholder.typicode.com/psosts')
    .then(response => response.json())
    .then(json => console.log("response", json))
    .catch(err => console.warn('Failed fetching from endpoint', err))

  let target = document.getElementById('render-target')
  React.render(
    <h1>Hello, master</h1>,
    target
  )
})
