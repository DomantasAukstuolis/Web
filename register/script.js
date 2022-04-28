function registerNewUser() {
  let username = document.getElementById("Username").value;
  let password = document.getElementById("Password").value; 
  let repeatpassword = document.getElementById("RepeatPassword").value; 
  if(checkIfEqauls(password, repeatpassword)) {
  if(validate(username, " slapyvardį ") && validate(password, " slaptažodį ")){
    addNewUser(username, password);
    }
  }
  else alert("Nesutampa slaptažodžiai");
}

function checkIfEqauls(password, repeatpassword){
  if(password == repeatpassword) return true;
  else return false;
}

function validate(value, text) {
  var minNumberofChars = 6;
  var maxNumberofChars = 16;
  if(value.length < minNumberofChars || value.length > maxNumberofChars){
      alert("Jūsų" +text+ "turi sudaryti nuo 6 iki 16 simbolių");
      return false;
  }
  else return true;
}

function addNewUser(username, password){
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://localhost:8080/addNewUser', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = () => handleResponse(xhr.responseText);
  xhr.send(JSON.stringify({
    'username': username,
    'password': password
  }));
}

function redirectToLogin(){
  document.location.href="http://127.0.0.1:5500/index.html";
}

function handleResponse(response){
  if(response != "Success") alert("Vartotojas tokiu vardu jau yra užregistruotas")
  else {
    alert("Vartotojas sėkmingai sukurtas");
    redirectToLogin();
  }
}