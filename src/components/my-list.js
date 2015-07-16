import {element} from 'deku'

let loadStuff = (event, { state, props }, updateState) => {
  updateState({ loading: true })
  props.api.getStuff()
    .then(json => updateState({
      stuff: json,
      loading: false
    }))
    .catch(err => console.warn('Failed fetching from endpoint', err))
}

let render = ({
  state: {
    stuff = [],
    loading = false
  }
}) =>
  <div className="container">
    <h1>REPLACEME (with a title)</h1>
    <button className="btn btn-default" onClick={loadStuff}>
      {loading ? 'Loading...' : 'Click me to load stuff'}
    </button>
    <div>
      {stuff.map(x =>
        <div key={x.id} className="row">
          <div className="col-xs-6 col-md-4">{x.title}</div>
        </div>
      )}
    </div>
  </div>

export default { render }
