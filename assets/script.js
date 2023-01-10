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
  
    let date = weather.list[0].dt_txt
    //getting the Icon and make an image with it..
    
    for (let i = 1; i < 5; i++) {
        let date = weather.list[i].dt_txt;
        
        document.querySelector(`#card${i}`).append(`Date: ${date}`);
        document.querySelector(`#card${i}`).style.fontWeight = 'bold';
      
        let temp = weather.list[i].main.temp;
        document.querySelector(`#card${i}-temp`).append(`Temp: ${temp}`);
       
      
        let humidity = weather.list[i].main.humidity;
        document.querySelector(`#card${i}-humid`).append(`Humidity: ${humidity}`);
      
      
        let wind = weather.list[i].wind.speed;
        document.querySelector(`#card${i}-wind`).append(`Wind Speed: ${wind}`);
       
      
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
  console.log(dailyweather);
  let ctemp = dailyweather.main.temp;
  document.querySelector(`#temp`).append(` ${ctemp}`);
  let cwind = dailyweather.wind.speed;
  document.querySelector(`#wind`).append(` ${cwind}`);
  let chumidity = dailyweather.main.humidity;
  document.querySelector(`#humid`).append(` ${chumidity}`);
  let high = dailyweather.main.temp_max;
  document.querySelector(`#high`).append(` ${high}`);
  let ciconData = dailyweather.weather[0].icon;
       console.log(ciconData);
  const iconBaseUrl = "http://openweathermap.org/img/wn/";
document.querySelector(`#current-icon`).src = `${iconBaseUrl}${ciconData}@2x.png`;
        
   });
  }













