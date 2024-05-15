document.getElementById("getWeatherBtn").addEventListener("click", function () {
  var location = document.getElementById("locationInput").value.trim();
  const dateObject = new Date();
  var date = `${dateObject.getFullYear()}-${
    dateObject.getMonth() + 1
  }-${dateObject.getDate()}`;
  if (location === "") {
    alert("Please enter a location");
    return;
  }

  var apiUrl = `https://api.weatherapi.com/v1/astronomy.json?key=1b1e3129bb05439293e140843241405&q=${location}&dt=${date}`;

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
                <h5 class="card-title">Astronomy Details for ${data.location.name}, ${data.location.country}</h5>
                <p class="card-text"><span class="sun-icon"><i class="fas fa-sun"></i></span> Sunrise: ${data.astronomy.astro.sunrise}</p>
                <p class="card-text"><span class="sun-icon"><i class="fas fa-sun"></i></span> Sunset: ${data.astronomy.astro.sunset}</p>
                <p class="card-text"><span class="moon-icon"><i class="fas fa-moon"></i></span> Moonrise: ${data.astronomy.astro.moonrise}</p>
                <p class="card-text"><span class="moon-icon"><i class="fas fa-moon"></i></span> Moonset: ${data.astronomy.astro.moonset}</p>
                <p class="card-text">Moon Phase: ${data.astronomy.astro.moon_phase}</p>
                <p class="card-text">Moon Illumination: ${data.astronomy.astro.moon_illumination}%</p>
              </div>
            </div>
          `;
      document.getElementById("weatherInfo").innerHTML = weatherInfo;
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
      document.getElementById("weatherInfo").innerHTML =
        '<p class="text-danger">Failed to fetch weather information. Please try again later.</p>';
    });
});
