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

let storedCities2 = JSON.parse(localStorage.getItem("cityButtons")) || []
    if (storedCities2.length) {
        buttonsHTML = '';
      storedCities2.forEach(function(cityName) {
        buttonsHTML += `<button>${cityName}</button>`;
      });
      document.querySelector(".city").innerHTML = buttonsHTML;
    }
    document.querySelector(".city").addEventListener('click', function(event) {
      if (event.target.tagName === 'BUTTON') {
        getLat(event.target.innerHTML);
      }
    });

    function storedCities(cityName) {
        if(!cities.includes(cityName)){
            cities.push(cityName);
            localStorage.setItem("cityButtons", JSON.stringify(cities));
        }
    }
function getLat(cityName) {
    
    fetch(`http://api.openweathermap.org/geo/1.0/direct?appid=${key}&q=${cityName}`
)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    getDailyWeather(data[0].lat,data[0].lon);
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
  let forecastDiv = document.querySelector('.card-title')
  forecastDiv.innerHTML = '';
    //getting the Icon and make an image with it..
    
    for (let i = 1; i < 5; i++) {
        let forecast = weather.list[i];

        let date = forecast.dt_txt;
        let dateElement = document.createElement("p");
        dateElement.innerHTML = `Date: ${date}`;
        forecastDiv.appendChild(dateElement);

        let temp = forecast.main.temp;
        let tempElement = document.createElement("p");
        tempElement.innerHTML = `Temperature: ${temp}`;
        forecastDiv.appendChild(tempElement);

        let humidity = forecast.main.humidity;
        let humidElement = document.createElement("p");
        humidElement.innerHTML = `Humidity: ${humidity}`;
        forecastDiv.appendChild(humidElement);

        let wind = forecast.wind.speed;
        let windElement = document.createElement("p");
        windElement.innerHTML = `Wind: ${wind}`;
        forecastDiv.appendChild(windElement);
       
      
        let iconData = weather.list[i].weather[0].icon;
       
        const iconBaseUrl = "http://openweathermap.org/img/wn/";
    document.querySelector(`#card${i}-icon`).src = `${iconBaseUrl}${iconData}@2x.png`;


      }
      
 });
}
function getDailyWeather(lat,lon){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=imperial`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (dailyweather) {
        let currentDiv = document.querySelector('#current-data');
       currentDiv.innerHTML = '';
  console.log(dailyweather);
  let ctemp = dailyweather.main.temp;
  let tempElement = document.createElement("p");
  tempElement.innerHTML = `Temperature: ${ctemp}`;
  currentDiv.appendChild(tempElement);
  
  let cwind = dailyweather.wind.speed;
  let windElement = document.createElement("p");
  windElement.innerHTML = `Wind: ${cwind}`;
  currentDiv.appendChild(windElement);
  
  let chumidity = dailyweather.main.humidity;
  let humidElement = document.createElement("p");
  humidElement.innerHTML = `Humidity: ${chumidity}`;
  currentDiv.appendChild(humidElement);
  
  let high = dailyweather.main.temp_max;
  let highElement = document.createElement("p");
  highElement.innerHTML = `High: ${high}`;
  currentDiv.appendChild(highElement);
  let ciconData = dailyweather.weather[0].icon;
       console.log(ciconData);
  const iconBaseUrl = "http://openweathermap.org/img/wn/";
document.querySelector(`#current-icon`).src = `${iconBaseUrl}${ciconData}@2x.png`;
        
   });
  }
