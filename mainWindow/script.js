var userid;
var clickCounter;

function checkId(){
  userid = sessionStorage.getItem("userId");
  clickCounter = sessionStorage.getItem("clicks");
  if(userid == null){
    redirectToLogin();
    alert("Privalote prisijungti")
  }
  document.getElementById("searches").innerHTML = "Searches: " + clickCounter;
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
  xhr.open('GET', 'http://api.weatherstack.com/current?access_key=c06ad3f845a12dbd88dc0b9d1aae653b&query=' + cityName, true);
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
  clickCounter++;
  document.getElementById("searches").innerHTML = "Searches: " + clickCounter;
  var xhr = new XMLHttpRequest();
  xhr.open('PUT', 'http://localhost:8080/updateClicks/' + userid, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  // xhr.onload = () => handleResponse(xhr.responseText);
  xhr.send(JSON.stringify({
    'clicks': clickCounter
  }));
}