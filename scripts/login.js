function submitForm(event){
    event.preventDefault();
    var form = document.getElementById("loginForm");
    let formData = new FormData(form);

    if (form.checkValidity() === false){
        event.stopPropagation();
        return;
    }

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "php/login.php");
    xhr.send(formData);

    xhr.onreadystatechange = function(){
        if (xhr.readyState === XMLHttpRequest.DONE){
            switch (xhr.status){
                case 200:
                    var user = xhr.responseText.substring(0, xhr.responseText.length-3);
                    localStorage.setItem("user", user); // Save the response in localStorage
                    window.location.href = "dashboard.html";
                    break;
                case 401:
                    document.getElementById("invalidLogin").classList.add("invalidDisplay");
                    break;
                default:
                    alert("Erro desconhecido! Tente novamente mais tarde");
                    break;
            }
        }
    }
}
