function login(){
  let username = document.getElementById("Username").value;
  let password = document.getElementById("Password").value; 
  userLogin(username, password);
}

function userLogin(username, password){
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://localhost:8080/userLogin', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = () => handleResponse(xhr.responseText);
  xhr.send(JSON.stringify({
    'username': username,
    'password': password
  }));

}

function redirectToRegister(){
  document.location.href="http://127.0.0.1:5500/register/index.html";
}

function handleResponse(response){
  if(response != "Wrong credentials or no such user"){
    response = response.replace(/[|]/g, "");
    var id = response[0];
    var clicks = response [1];
    sessionStorage.setItem("userId", id);
    sessionStorage.setItem("clicks", clicks);
    document.location.href="http://127.0.0.1:5500/mainWindow/index.html";
  }
  else alert("Blogas vartotojo vardas arba slaptažodis");
}