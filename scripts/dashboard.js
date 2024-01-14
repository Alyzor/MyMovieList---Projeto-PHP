
var user = JSON.parse(localStorage.getItem("user"));
user = user[0];

document.addEventListener("DOMContentLoaded", (event) => {  
    populateTable();
});

function displayNoMovies(){
    document.getElementById("loading").classList.remove("show");
    var table = document.getElementById("movieTable");
    var row = table.insertRow(-1);
    var cell = row.insertCell(0);
    cell.colSpan = 6;
    cell.innerHTML = "Não tem filmes adicionados!";
    cell.classList.add("noMovies");
}

function genreTree(movie, genre){
    var genreDiv = document.createElement("div");
    genreDiv.classList.add("genreName");
    genreDiv.id = (genre.nome);

    var genreTitle = document.createElement("h3");
    genreTitle.innerHTML = genre.nome;
    genreDiv.appendChild(genreTitle);

    var movieDiv = document.createElement("div");
    movieDiv.classList.add("movie");
    movieDiv.id = (movie.id);

    var movieTitle = document.createElement("p");
    movieTitle.innerHTML = "Título: <br>" + movie.titulo;
    movieDiv.appendChild(movieTitle);

    var movieDescription = document.createElement("p");
    movieDescription.innerHTML = "Descrição: <br>" + movie.descricao;
    movieDiv.appendChild(movieDescription);

    var movieYear = document.createElement("p");
    movieYear.innerHTML = "Ano: <br>" + movie.ano;
    movieDiv.appendChild(movieYear);

    var movieRating = document.createElement("p");
    movieRating.classList.add("rating");
    movieRating.innerHTML = "Avaliação: <br>" + movie.avaliacao;
    movieDiv.appendChild(movieRating);

    var genreExists = false;
    
    var displayGenre = document.getElementById("displayGenre");

    if (displayGenre.children.length == 0){
        genreDiv.appendChild(movieDiv);
        genreDiv.classList.add("firstGenre");
        document.getElementById("displayGenre").appendChild(genreDiv);
        return;
    }else{
        for (var i = 0; i < displayGenre.children.length; i++){
            if (displayGenre.children[i].id == genre.nome){
                displayGenre.children[i].appendChild(movieDiv);
                genreExists = true;
            }
        }
    }

    if (!genreExists){
        genreDiv.appendChild(movieDiv);
        document.getElementById("displayGenre").appendChild(genreDiv);
    }
}

function populateTable(){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "php/getUserMovieList.php");
    xhr.send(user.id);

    xhr.onreadystatechange = function(){
        if (xhr.readyState === XMLHttpRequest.DONE){
            switch (xhr.status){
                case 200:
                    var trimResponse = xhr.responseText.substring(0, xhr.responseText.length-3);
                    if (xhr.responseText == "[]200"){
                        displayNoMovies();
                        return;
                    }
                    var movies = JSON.parse(trimResponse);
                    movies.forEach(async (movie) => {
                        var genero = await getGenero(movie.id);

                        var table = document.getElementById("movieTable");
                        var row = table.insertRow(-1);
                        var title = row.insertCell(0);
                        var description = row.insertCell(1);
                        var genre = row.insertCell(2);
                        var year = row.insertCell(3);
                        var rating = row.insertCell(4);
                        var options = row.insertCell(5);
                        
                        title.innerHTML = movie.titulo;
                        description.innerHTML = movie.descricao;
                        year.innerHTML = movie.ano;
                        genre.innerHTML = genero.nome;
                        
                        var ratingValue = movie.avaliacao.toString();
                        rating.innerHTML = ratingValue + "/5";

                        var div = document.createElement("div");
                        div.classList.add("tableBtns");

                        var editButton = document.createElement("button");
                        editButton.classList.add("editButton");
                        editButton.setAttribute("onclick", "editMovie('" +movie.id + "')");
                        var editIcon = document.createElement("i");
                        editIcon.classList.add("fas");
                        editIcon.classList.add("fa-edit");
                        editButton.appendChild(editIcon);

                        var deleteButton = document.createElement("button");
                        deleteButton.classList.add("deleteButton");
                        deleteButton.setAttribute("onclick", "deleteMovie('" + movie.id + "')");
                        var deleteIcon = document.createElement("i");
                        deleteIcon.classList.add("fas");
                        deleteIcon.classList.add("fa-trash");
                        deleteButton.appendChild(deleteIcon);

                        div.appendChild(editButton);
                        div.appendChild(deleteButton);
                        options.appendChild(div);

                        genreTree(movie, genero);
                    });
                    document.getElementById("loading").classList.remove("show");
                    break;
                case 401:
                    alert("Erro ao carregar filmes! Tente novamente mais tarde");
                    break;
                default:
                    alert("Erro desconhecido! Tente novamente mais tarde");
                    break;
            }
        }
    }
};

function deleteMovie(id){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "php/deleteMovie.php");
    xhr.send(id);

    xhr.onreadystatechange = function(){
        if (xhr.readyState === XMLHttpRequest.DONE){
            switch (xhr.status){
                case 200:
                    window.location.reload();
                    break;
                case 401:
                    alert("Erro ao remover filme! Tente novamente mais tarde");
                    break;
                default:
                    alert("Erro desconhecido! Tente novamente mais tarde");
                    break;
            }
        }
    }
}

function editMovie(id){
    console.log(id);
}

async function getGenero(id){

    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "php/getMovieGenre.php");
        xhr.send(id);

        xhr.onreadystatechange = function(){
            if (xhr.readyState === XMLHttpRequest.DONE){
                switch (xhr.status){
                    case 200:
                        var trimResponse = xhr.responseText.substring(0, xhr.responseText.length-3);
                        var genre = JSON.parse(trimResponse);
                        resolve(genre[0]);
                        break;
                    case 401:
                        reject("Erro ao carregar filmes! Tente novamente mais tarde");
                        break;
                    default:
                        reject("Erro desconhecido! Tente novamente mais tarde");
                        break;
                }
            }
        }
    });
}

function filterMovies(){
    var filterTitle = document.getElementById("filter");
    var filter = filterTitle.value.toUpperCase();
    var table = document.getElementById("movieTable");
    var rows = table.rows;
    for (var i = 1; i < rows.length; i++){
        var title = rows[i].cells[0].innerHTML.toUpperCase();
        if (title.includes(filter)){
            rows[i].style.display = "";
        } else {
            rows[i].style.display = "none";
        }
    }
}