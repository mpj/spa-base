import React from 'react'

// this is a reusable react component
export default class MyListComponent extends React.Component {
  constructor(props) {
    super(props);

    let api = props.api

    // Set the default state of the the component
    // ONLY set state in this way when setting the default,
    // use this.setState when updating it, or re-renders won't trigger.
    this.state = {
      stuff: [],
      loading: false
    }

    // Notice that we are defining methods on the constructed object using
    // arrow functions instead of traditional class methods. This
    // has the advantage that the scope of *this* won't change and that
    // we don't have to mess around with .bind() and stuff. (The disadvantage
    // is that this is very slightly slower - it will have no impact in this case
    // because we only have a few lists, but if you create a react component
    // that will create thousands of instances per second you should use
    // traditional class methods.)
    this.loadStuff = () => {
      this.setState({ loading: true })
      api.getStuff()
        .then(json => this.setState({
          stuff: json,
          loading: false
        }))
        .catch(err => console.warn('Failed fetching from endpoint', err))
    }

    // The react render method is called whenever state changes.
    // What you're seeing here is JSX, an extension to JavaScript
    // that allows us to intermingle HTML and JS. It looks bizarre, but
    // it is fantastic when you get used to it, trust me.
    // https://facebook.github.io/react/docs/jsx-in-depth.html
    this.render = () =>
      <div className="container">
        <h1>REPLACEME (with a title)</h1>
        <button onClick={this.loadStuff}>
          {this.state.loading ? 'Loading...' : 'Click me to load stuff'}
        </button>
        {this.state.stuff.map(x =>
          <div key={x.id} className="row">
            <div className="col-xs-6 col-md-4">{x.title}</div>
          </div>
        )}
      </div>
  }
}
