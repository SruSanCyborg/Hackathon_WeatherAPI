document.getElementById("weatherForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const city = document.getElementById("cityInput").value;
    const apiKey = "ca11feca65578d48e85e6d8c37f53dad";
    const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        if (data.cod === "404") {
            document.querySelector(".city").textContent = "City not found!";
            document.querySelector(".temperature").textContent = "";
            document.querySelector(".description").textContent = "";
            document.querySelector(".pressure").textContent = "";
            document.querySelector(".humidity").textContent = "";
        } else {
            document.querySelector(".city").textContent = `${data.name}, ${data.sys.country}`;
            document.querySelector(".temperature").textContent = `Temperature: ${data.main.temp.toFixed()}°C`;
            document.querySelector(".description").textContent = `Weather: ${data.weather[0].description}`;
            document.querySelector(".pressure").textContent = `Pressure: ${data.main.pressure} hPa`;
            document.querySelector(".humidity").textContent = `Humidity: ${data.main.humidity}%`;

            
            const iconCode = data.weather[0].icon;
            document.querySelector(".weather-icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${iconCode}@2x.png" alt="weather icon" />`;

            updateBackground(data.main.temp);
        }
    })
    .catch(error => {
        console.error("Error fetching weather data:", error);
        document.querySelector(".city").textContent = "Error fetching weather data";
    });
});

function updateBackground(temperature) {
    const backgroundContainer = document.querySelector(".background-container");

    backgroundContainer.classList.remove("cold", "cool", "warm", "hot");

    if (temperature <= 5) {
        backgroundContainer.style.backgroundImage = "url('cold.gif')";
    } else if (temperature > 5 && temperature <= 15) {
        backgroundContainer.style.backgroundImage = "url('cold.gif')";
    } else if (temperature > 15 && temperature <= 25) {
        backgroundContainer.style.backgroundImage = "url('warm-weather.gif')";
    } else if (temperature > 25) {
        backgroundContainer.style.backgroundImage = "url('sunny.gif')";
    }
}
