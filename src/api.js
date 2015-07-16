let api = {
  getStuff: () =>
    fetch('http://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .catch(err => console.warn('Failed fetching from endpoint', err))
}
// We just export the api object as the default:
export default api
