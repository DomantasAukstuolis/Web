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
  document.location.href="http://127.0.0.1:5500/index.html";
}
function searchCity(){
  let cityName = document.getElementById("cityName").value;
  searchApi(cityName);
}

function searchApi(cityName){
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://api.weatherstack.com/current?access_key=5c1b9f829b632be5ef2b76a162a22ab7&query=' + cityName, true);
  xhr.set
  xhr.onload = () => handleResponse(xhr);
  xhr.send(null)
}

function handleResponse(xhr){
  response = xhr.responseText
  var json = response;
  var obj = JSON.parse(json);
  if(obj["success"] != false){
  let icon = JSON.stringify(obj["current"]["weather_icons"][0]).replace(/["]/g, "");
  let temperature = (obj["current"]["temperature"]);
  let weatherDescription = (obj["current"]["weather_descriptions"][0]);
  let windSpeed = (obj["current"]["wind_speed"]);
  let feelsLike = (obj["current"]["feelslike"]);
  let location = (obj["location"]["name"]);
  document.getElementById("location").innerHTML = location;
  document.getElementById("temperature").innerHTML = temperature + "°C";
  document.getElementById("feelsLike").innerHTML = feelsLike + "°C";
  document.getElementById("windSpeed").innerHTML = windSpeed + "m/s";
  document.getElementById("image").src = icon;
  document.getElementById("weatherDescription").innerHTML = weatherDescription;
  updateUserClicks();
  } else alert("City not found");
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