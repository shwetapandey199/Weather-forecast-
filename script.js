const apiKey = "5a8167a617848da1772063ce8a8b4268";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        var data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        // Set weather icon based on weather condition
        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "clouds.png"; 
            document.querySelector(".weather").className = "weather weather-clouds"; // Set class for cloudy
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "clear.png"; 
            document.querySelector(".weather").className = "weather weather-clear"; 
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "rain.png"; // Replace with actual URL
            document.querySelector(".weather").className = "weather weather-rain";
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "drizzle.png"; // Replace with actual URL
            document.querySelector(".weather").className = "weather weather-drizzle"; // Set class for drizzle
        } else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "mist.png"; // Replace with actual URL
            document.querySelector(".weather").className = "weather weather-mist";
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});
