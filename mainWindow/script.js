var userid;

function checkId(){
  userid = sessionStorage.getItem("userId");
  if(userid == null){
    redirectToLogin();
    alert("Privalote prisijungti")
  }
}
function redirectToLogin(){
  document.location.href="file:///C:/Users/doman/Visual%20Studio%20Code/Web/index.html";
}