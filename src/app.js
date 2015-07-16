import $ from 'jquery'
import React from 'react'

$().ready(() => {
  let target = document.getElementById('render-target')
  React.render(
    <h1>Hello, </h1>,
    target
  )
})
