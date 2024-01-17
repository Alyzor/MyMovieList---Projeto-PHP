var id = null;

async function createMovie(event){
    event.preventDefault();
    // Get the form data
    var form = document.getElementById("movieForm");
    var formData = new FormData(form);

    if (formData.get("genero") == "" && formData.get("novoGenero") == ""){
    // Verify if form data is valid
    if (form.checkValidity() === false){
        // Cancel the event

        event.stopPropagation();
        return;
    }
    }

    if (formData.get("novoGenero").length > 0){
        formData.set("genero", formData.get("novoGenero"));
        var idgenero = await createNewGenre(formData.get("novoGenero"));
        if (idgenero == null) { return; }
        formData.delete("novoGenero");
        formData.set("genero", idgenero);
    }else{
        var idgenero = formData.get("genero");
        formData.delete("novoGenero");
    }
    formData.set("userID", user.id);

    if (idgenero != null){
        var xhr = new XMLHttpRequest();

        if (id != null){
            xhr.open("POST", "php/updateMovie.php");
            formData.set("id", id);
        }else{
            xhr.open("POST", "php/createMovie.php");
        }

        xhr.send(formData);

        xhr.onreadystatechange = function(){
            if (xhr.readyState === XMLHttpRequest.DONE){
                switch (xhr.status){
                    case 200:
                        if (formData.get("id") == null){
                            alert("Filme criado com sucesso!");
                        }else{
                            alert("Filme atualizado com sucesso!");
                        }
                        location.href = "dashboard.html";
                        break;
                    case 401:
                        alert("Erro ao criar filme! Tente novamente mais tarde");
                        break;
                    default:
                }
            }
        }
    }
}

async function createNewGenre(nome) {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "php/createGenre.php");
        xhr.send(nome);

        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                switch (xhr.status) {
                    case 200:
                        var trimResponse = xhr.responseText.substring(0, xhr.responseText.length - 3);
                        console.log(trimResponse);
                        resolve(trimResponse);
                        break;
                    case 409:
                        alert("Erro! Já existe um género com esse nome!");
                        return;
                    default:
                        reject("Erro desconhecido! Tente novamente mais tarde");
                        break;
                }
            }
        };
    });
}

document.addEventListener("DOMContentLoaded", function(){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "php/getGenreList.php");
    xhr.send();

    xhr.onreadystatechange = function(){
        if (xhr.readyState === XMLHttpRequest.DONE){
            switch (xhr.status){
                case 200:
                    var genreList = JSON.parse(xhr.responseText);
                    var select = document.getElementById("genero");
                    genreList.forEach(genre => {
                        var option = document.createElement("option");
                        option.value = genre.id;
                        option.text = genre.nome;
                        select.appendChild(option);
                    });
                    break;
                default:
                    break;
            }
        }
    };


    if (window.location.href.includes("?")){
    var params = new URLSearchParams(window.location.search);
    id = params.get("id");
    if (id == null) {return;}
    var xhr2 = new XMLHttpRequest();
    xhr2.open("POST", "php/getMovie.php");
    fdata = new FormData();
    fdata.set("id", id);
    xhr2.send(fdata);

    xhr2.onreadystatechange = function(){
        if (xhr2.readyState === XMLHttpRequest.DONE){
            switch (xhr2.status){
                case 200:
                    var response = JSON.parse(xhr2.responseText);
                    var movie = response[0][0];
                    var genreId = response[1][0].genre_id;

                    console.log(movie);
                    console.log(genreId);

                    document.getElementById("titulo").value = movie.titulo;
                    document.getElementById("ano").value = movie.ano;
                    document.getElementById("avaliacao").value = movie.avaliacao;
                    document.getElementById("descricao").value= movie.descricao;

                    var genreChildren = document.getElementById("genero").childNodes;

                    for (const child of genreChildren){
                        if (child.value == genreId){
                            child.selected = true;
                        }
                    }
                    break;
                default:
                    id = null;
                    break;
            }
        }
    };
    }

    document.getElementById("loading").classList.remove("show");

});