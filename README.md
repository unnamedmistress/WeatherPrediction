# WeatherPrediction
This code is using JavaScript to create a web page that allows a user to search for a city's weather forecast by its name. The user enters the city name into an input field, and clicks a submit button, which triggers the getCity function.

The getCity function is executed when the user clicks the submit button, It starts by preventing the default action of the form, which is to submit the form and reload the page. It then retrieves the value entered by the user into the input field, then it calls the getLat function passing the city name as a parameter.
It will also check if the input is not empty and shows an error message if the input is empty.

The getLat function uses the Fetch API to send a GET request to the OpenWeatherMap API to retrieve the latitude and longitude of the city passed as a parameter.
It then calls the getWeather and getDailyWeather functions, passing the latitude and longitude as arguments.

The getWeather function uses the Fetch API to send another GET request to the OpenWeatherMap API to retrieve the forecast for the city. It will remove the child element of the parent element with the ID of "card" followed by the current iteration number of a for loop and will show the date, temperature, humidity, wind, and a weather icon of the forecast for the next 5 days.

The storedCities function saves the searched city to the localStorage and pushes it to an array and also create and appends buttons to the page, with each button representing a previously searched city, that when clicked will call the getLat function with the city name as the parameter.

# Try it out  https://unnamedmistress.github.io/WeatherPrediction/
![screenshot](assets/Screenshot%202023-01-10%20211053.png)