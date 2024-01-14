function logout(){
    localStorage.removeItem("user");
    window.location.href = "login.html";
}

var user = JSON.parse(localStorage.getItem("user"));
user = user[0]

document.addEventListener("DOMContentLoaded", (event) => { 
    document.getElementById("nomeUser").innerHTML = user.nome;
    if (user.foto_perfil != null){
        document.getElementById("fotoPerfil").src = user.foto-perfil;
    }
});

function changePfp(){
    console.log("clicado");
    document.getElementById("changePfp").click();
}

function uploadPfp() {
    const profile_picture = document.getElementById("changePfp");

  // Upload profile picture
  const formData = new FormData();
  formData.append("file", profile_picture.files[0]);

  xhr = new XMLHttpRequest();
    xhr.open("POST", "php/changePfp.php");
    xhr.send(formData);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            switch (xhr.status) {
                case 200:
                    console.log(xhr.responseText);
                    break;
                case 401:
                    alert("Erro ao carregar imagem! Tente novamente mais tarde");
                    break;
                default:
                    alert("Erro desconhecido! Tente novamente mais tarde");
                    break;
            }
        }
    }
}