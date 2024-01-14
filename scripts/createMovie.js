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
        xhr.open("POST", "php/createMovie.php");
        xhr.send(formData);

        xhr.onreadystatechange = function(){
            if (xhr.readyState === XMLHttpRequest.DONE){
                switch (xhr.status){
                    case 200:
                        alert("Filme criado com sucesso!");
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
});