export default {
  getStuff: () =>
    fetch('http://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .catch(err => console.warn('Failed fetching from endpoint', err))

}
