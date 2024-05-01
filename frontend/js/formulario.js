window.onload = () => {
    const body = document.querySelector('body')
    const form = document.querySelector('form')
    const editMovie = document.querySelector("#editMovie")
    const addMovie = document.querySelector("#addMovie")
    const deleteMovie = document.querySelector("#deleteMovie")
    const title = document.querySelector('#title')
    const rating = document.querySelector('#rating')
    const awards = document.querySelector('#awards')
    const release_date = document.querySelector('#release_date')
    const length = document.querySelector('#length')
  
    editMovie.style.display = "none"
    deleteMovie.style.display = "none"
  
    const urlParams = new URLSearchParams(location.search);
    const movieId = urlParams.get('id');
    const id = parseInt(movieId)
  
    const divHome =  document.createElement("div")
    divHome.style.display = 'flex'
    divHome.style.justifyContent = 'center'
  
    const pHome = document.createElement('p')
    pHome.style.fontSize = '18px'
    pHome.style.fontWeight = "600"
    const linkHome = document.createElement("a")
    linkHome.setAttribute("href",`home.html`)
    pHome.innerText = 'Home'
    linkHome.appendChild(pHome)
    
    divHome.appendChild(linkHome)
    body.appendChild(divHome)
    body.appendChild(form)
  
    if (id) {
      editMovie.style.display = "inline"
      deleteMovie.style.display = "inline"
      addMovie.style.display = "none"
  
      fetch(`http://localhost:3031/api/movies/${id}`)
      .then((response) => response.json())
      .then((pelicula) => {
        title.value = pelicula.data.title
        rating.value = pelicula.data.rating
        awards.value = pelicula.data.awards
        release_date.value = pelicula.data.release_date.split('T')[0]
        length.value = pelicula.data.length
      })
  
      editMovie.addEventListener('click', (e) => {
        e.preventDefault()
        const movieUpdate = {
          title: title.value,      
          rating: rating.value,
          awards: awards.value,
          release_date: release_date.value,
          length: length.value
        }
        fetch(`http://localhost:3031/api/movies/update/${id}`,{
          method: 'PUT',
          headers: {'content-Type': 'application/json'},
          body: JSON.stringify(movieUpdate)
        })
        .then((response) => response.json())
        .then(() => {window.location.href = 'home.html'})
      })
  
      deleteMovie.addEventListener('click', (e) => {
        e.preventDefault()
        fetch(`http://localhost:3031/api/movies/delete/${id}`,{
          method: 'DELETE',
          headers: {'content-Type': 'application/json'}
        })
        .then((response) => response.json())
        .then(() => {window.location.href = 'home.html'})
      })
    }
  
    addMovie.addEventListener('click', (e) => {
      e.preventDefault()
      const newMovie = {
        title: title.value,      
        rating: rating.value,
        awards: awards.value,
        release_date: release_date.value,
        length: length.value
      }
      fetch(`http://localhost:3031/api/movies/create`,{
        method: 'POST',
        headers: {'content-Type': 'application/json'},
        body: JSON.stringify(newMovie)
      })
      .then((response) => response.json())
      .then(() => {window.location.href = 'home.html'})
    })
  
  }