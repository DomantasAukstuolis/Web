var userid;
var clickCounter;

function checkId(){
  userid = sessionStorage.getItem("userId");
  clickCounter = sessionStorage.getItem("clicks");
  if(userid == null){
    redirectToLogin();
    alert("Privalote prisijungti")
  }
}
function redirectToLogin(){
  document.location.href="file:///C:/Users/doman/Visual%20Studio%20Code/Web/index.html";
}
function searchCity(){
  let cityName = document.getElementById("cityName").value;
  searchApi(cityName);
  updateUserClicks();
}

function searchApi(cityName){
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://api.weatherstack.com/current?access_key=37d3cf93821f9925e3e63a1a43f9d92c&query=' + cityName, true);
  xhr.set
  xhr.onload = () => handleResponse(xhr.responseText);
  xhr.send(null)
}

function handleResponse(response){
  var json = response;
  var obj = JSON.parse(json);
  let icon = JSON.stringify(obj["current"]["weather_icons"][0]).replace(/["]/g, "");
  let temperature = (obj["current"]["temperature"]);
  let weatherDescription = (obj["current"]["weather_descriptions"][0]);
  let windSpeed = (obj["current"]["wind_speed"]);
  let feelsLike = (obj["current"]["feelslike"]);
  document.getElementById("temperature").innerHTML = temperature + "°C";
  document.getElementById("feelsLike").innerHTML = feelsLike + "°C";
  document.getElementById("windSpeed").innerHTML = windSpeed + "m/s";
  document.getElementById("image").src = icon;
  document.getElementById("weatherDescription").innerHTML = weatherDescription;
}

function updateUserClicks(){
  
}