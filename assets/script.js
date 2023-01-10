// 1. Get the city value from the form
// 2. Pass the city to the geoCode function
// 3. Pass the Lat and Long to the GetWeather function
// 4. Build HTML with the Data we get from the weather
let city = document.querySelector('#city-search');
let submitBtn = document.querySelector('#submitbtn')
const key = 'e16d7ce165cee00c3693cb78fb283a63';
const error = document.querySelector("#error-container");
let cities = [];
let buttonsHTML = '';

function getCity (event) {
  
    let cityName = city.value.trim();
    city.value = "";  
    event.preventDefault();
    //ensure something was entered, not necessarily valid
    if (cityName) {
        
        getLat(cityName);
        storedCities(cityName);
        error.innerHTML = ""
    } else {
        error.innerHTML = "Please enter a city name!"
        return;
    }}
submitBtn.addEventListener('click', getCity);

function storedCities(cityName) {
    cities.push(cityName);
    localStorage.setItem("cityButtons", JSON.stringify(cities));
    let storedCities = JSON.parse(localStorage.getItem("cityButtons"));
    storedCities.forEach(function(cityName) {
      buttonsHTML += `<button>${cityName}</button>`;
    });
    document.querySelector(".city").innerHTML = buttonsHTML;
  }
function getLat(cityName) {
    
    fetch(`http://api.openweathermap.org/geo/1.0/direct?appid=${key}&q=${cityName}`
)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    getWeather(data[0].lat,data[0].lon)
    console.log(data)
  });}

function getWeather(lat,lon){
  console.log(lat,lon);
  fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=imperial`
)
  .then(function (response) {
    return response.json();
  })
  .then(function (weather) {
    console.log(weather)
    let date = weather.list[0].dt_txt
console.log(date);
document.querySelector('#card1').append(`Date: ${date}`);
document.querySelector('#card1').style.fontWeight = 'bold';
    //getting the Icon and make an image with it..
    
    for (let i = 1; i < 5; i++) {
        let date = weather.list[i].dt_txt;
        console.log(date);
        document.querySelector(`#card${i}`).append(`Date: ${date}`);
        document.querySelector(`#card${i}`).style.fontWeight = 'bold';
      
        let temp = weather.list[i].main.temp;
        document.querySelector(`#card${i}-temp`).append(`Temp: ${temp}`);
        console.log(temp);
      
        let humidity = weather.list[i].main.humidity;
        document.querySelector(`#card${i}-humid`).append(`Humidity: ${humidity}`);
        console.log(humidity);
      
        let wind = weather.list[i].wind.speed;
        document.querySelector(`#card${i}-wind`).append(`Wind Speed: ${wind}`);
        console.log(wind);
      
        let iconData = weather.list[i].weather[0].icon;
        console.log(iconData);
        const iconBaseUrl = "http://openweathermap.org/img/wn/";
    document.querySelector(`#card${i}-icon`).src = `${iconBaseUrl}${iconData}@2x.png`;


      }
      
 });
}













