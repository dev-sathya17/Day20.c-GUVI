document.getElementById("getWeatherBtn").addEventListener("click", function () {
  var location = document.getElementById("locationInput").value.trim();

  if (location === "") {
    alert("Please enter a location");
    return;
  }

  var apiUrl = `https://api.weatherapi.com/v1/current.json?key=1b1e3129bb05439293e140843241405&q=${location}&aqi=yes`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      var weatherInfo = `
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Weather in ${data.location.name}, ${data.location.country}</h5>
                <img src="${data.current.condition.icon}" alt="${data.current.condition.text}">
                <p class="card-text">Condition: ${data.current.condition.text}</p>
                <p class="card-text">Wind Speed: ${data.current.wind_mph} mph</p>
                <p class="card-text">Pressure: ${data.current.pressure_mb} mb</p>
                <p class="card-text">Air Quality: ${data.current.air_quality}</p>
                <p class="card-text">Humidity: ${data.current.humidity}%</p>
              </div>
            </div>
          `;
      document.getElementById("weatherInfo").innerHTML = weatherInfo;
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
      document.getElementById("weatherInfo").innerHTML =
        "<p>Failed to fetch weather information. Please try again later.</p>";
    });
});
