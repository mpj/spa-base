import $ from 'jquery'
import React from 'react'
import 'babelify/polyfill'

export class MyListComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      stuff: [],
      loading: false
    }

    this.loadStuff = () => {
      this.setState({ loading: true })
      fetch('http://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(json => this.setState({
          stuff: json,
          loading: false
        }))
        .catch(err => console.warn('Failed fetching from endpoint', err))
    }

    this.render = () =>
      <div>
        <button onClick={this.loadStuff}>
          {this.state.loading ? 'Loading...' : 'Click me to load stuff'}
        </button>
        {this.state.stuff.map(x =>
          <div key={x.id}>{x.title}</div>
        )}
      </div>
  }

}



$().ready(() => {



  let target = document.getElementById('render-target')
  React.render(<MyListComponent />, target)
})
