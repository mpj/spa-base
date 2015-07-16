import React from 'react'

export default class MyListComponent extends React.Component {
  constructor(props) {
    super(props);

    let api = props.api

    this.state = {
      stuff: [],
      loading: false
    }

    this.loadStuff = () => {
      this.setState({ loading: true })
      api.getStuff()
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
