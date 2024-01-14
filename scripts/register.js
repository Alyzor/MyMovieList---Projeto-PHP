function submitForm(event) {
  event.preventDefault();
  document.getElementById("passwordError").classList.remove("errorExists");
  document.getElementById("mailError").classList.remove("errorExists");
  // Get the form data
  var form = document.getElementById("registerForm");
  var formData = new FormData(form);
  // Verify if form data is valid

  if (form.checkValidity() === false) {
    // Cancel the event
    event.stopPropagation();
    return;
  }
  //verify password and confirm password before sending data to server  
  var password = formData.get("password");
  var confirmPassword = formData.get("confirmPassword");
  if (password != confirmPassword) {
    document.getElementById("passwordError").classList.add("errorExists")
    return;
  }

  // Remove the confirm password field
  formData.delete("confirmPassword");

  // Create an AJAX request
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "php/register.php"); // Move this line before send

  xhr.send(formData); // This should be after open

  // Handle the response
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      switch (xhr.status) {
        case 200:
          // Redirect to the login page
          window.location.href = "login.html";
          break;
        case 500:
          // Display the error message
          alert("Erro no servidor! Tente novamente mais tarde");
          break;
          case 409:
          // Display the error message
          document.getElementById("mailError").classList.add("errorExists");
          break;
        default:
          // Display the error message
          document.getElementById("passwordError").classList.add("errorExists");
          document.getElementById("errorMessage").innerHTML = "Erro desconhecido! Tente novamente mais tarde";
          break;
      }
    }
  };
}