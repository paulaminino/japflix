document.addEventListener("DOMContentLoaded", function() {
    
    let peliculasData = [];
    
    let URL_DATA = `https://japceibal.github.io/japflix_api/movies-data.json`;
    
    fetch (URL_DATA)
    .then(response => response.json())
    .then(data => {
         peliculasData = data
        })
    .catch(error => {
        console.error('Problema con tu operación de fetch', error);
    });
    
    const btnbuscar = document.getElementById('btnBuscar');
    let lista = document.getElementById('lista');
    //let muestra = document.getElementById('contenedorDetalles');
    
    btnbuscar.addEventListener('click', function () {
    let inputbuscar = document.getElementById('inputBuscar').value.toLowerCase();
    if (inputbuscar) {
    let resultados = peliculasData.filter(movie => {
        return movie.title.toLowerCase().includes(inputbuscar)||
               movie.genres.some(genre => genre.name.toLowerCase().includes(inputbuscar))||
               movie.tagline.toLowerCase().includes(inputbuscar)||
               movie.overview.toLowerCase().includes(inputbuscar);
    });
        mostrarResultados(resultados);
    }
    });
    
    inputBuscar.addEventListener('input', function() { //Para borrar el contenido de la lista al mismo tiempo que se borra el contenido por el buscador.
        if (inputBuscar.value === '') {
          lista.innerHTML = '';
        }
      });
    
    
    function mostrarResultados (peliculas){
    lista.innerHTML = "";
    
    peliculas.forEach(pelicula => {
        let peliculadiv = document.createElement('li');
        peliculadiv.className = "list-group-item bg-dark text-light mb-3"
    
        peliculadiv.innerHTML = `
        <h5 class="mb-1 titulo">${pelicula.title}</h5>
        <p class="mb-1">${pelicula.tagline}</p>
        <small>${mostrarEstrellas(pelicula.vote_average)}</small>
        `;
        /*peliculadiv.addEventListener('click', function() {
          mostrarDetalles(pelicula);
        });*/
        peliculadiv.querySelector('.titulo').addEventListener('click', function() {
          mostrarmenu(pelicula, this.parentElement);
        });
    
        lista.appendChild(peliculadiv);
      });
    }
    
    function mostrarEstrellas(vote_average) {
      let estrellas = Math.round(vote_average / 2);
      return '★'.repeat(estrellas).padEnd(5, '☆');
    }
    /* No pude hacer funcionar para que muestre el off-canvas!!!
    function mostrarDetalles(pelicula){
      let detallesDiv = document.createElement('div');
      detallesDiv.className = "offcanvas offcanvas-top show";
      detallesDiv.tabIndex = -1;
        detallesDiv.id = "offcanvasTop";
        detallesDiv.ariaLabelledby = "offcanvasTopLabel";
        detallesDiv.innerHTML = `
         <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop">Toggle top offcanvas</button>
    
    <div class="offcanvas offcanvas-top" tabindex="-1" id="offcanvasTop" aria-labelledby="offcanvasTopLabel">
      <div class="offcanvas-header">
        <h3 class="offcanvas-title" id="offcanvasTopLabel">${pelicula.title}</h3>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
      ${pelicula.overview}
      <hr>
      <small>${pelicula.genres.join(', ')}</small>
      </div>
    </div>
    `;
    
    document.body.appendChild(detallesDiv);
    */
    let contenedorDropdown = document.getElementById('contenedorDropdown');
    let titulo = document.getElementById('titulo');
    
    function mostrarmenu (pelicula, contenedorDropdown){
      let menuDropdown = `
      <div class="dropdown" >
          <button class="float-end btn btn-secondary dropdown-toggle autoClose" href="#" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          Mostrar detalles:
          </button>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="">Year: ${pelicula.release_date}</a></li>
            <li><a class="dropdown-item" href="">Runtime: ${pelicula.runtime}</a></li>
            <li><a class="dropdown-item" href="">Budget: ${pelicula.budget}</a></li>
            <li><a class="dropdown-item" href="">Revenue: ${pelicula.revenue}</a></li>
          </ul>
          </div>
      `;
    
      contenedorDropdown.innerHTML = menuDropdown;
    }
      
    });