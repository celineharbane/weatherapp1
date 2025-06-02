
let apiKey = "18078e3e4d2cfcb500af8960eaae6090";

navigator.geolocation.getCurrentPosition(async function (position) {
    try {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const map = await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5&appid=${apiKey}&units=metric&lang=fr`);
        const userdata = await map.json();
        const loc = userdata[0].name;

        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${loc}&appid=${apiKey}&units=metric&lang=fr`;
        const response = await fetch(url);
        const data = await response.json();

        // Affichage météo actuelle
        document.getElementById("city-name").innerHTML = data.city.name;
        document.getElementById("metric").innerHTML = Math.floor(data.list[0].main.temp) + "°";
        document.querySelectorAll("#weather-main")[0].innerHTML = data.list[0].weather[0].description;
        document.querySelectorAll("#weather-main")[1].innerHTML = data.list[0].weather[0].description;
        document.getElementById("humidity").innerHTML = Math.floor(data.list[0].main.humidity);
        document.getElementById("feels-like").innerHTML = Math.floor(data.list[0].main.feels_like);
        document.getElementById("temp-min-today").innerHTML = Math.floor(data.list[0].main.temp_min) + "°";
        document.getElementById("temp-max-today").innerHTML = Math.floor(data.list[0].main.temp_max) + "°";

        const weatherCondition = data.list[0].weather[0].main.toLowerCase();
        const weatherImg = document.querySelector(".weather-icon");
        const weatherImgs = document.querySelector(".weather-icons");

        const iconMap = {
            rain: "img/rain.png",
            clear: "img/clear.png",
            "clear sky": "img/clear.png",
            snow: "img/snow.png",
            clouds: "img/clouds.png",
            smoke: "img/clouds.png",
            mist: "img/mist1.png",
            fog: "img/mist1.png",
            haze: "img/haze.png",
            thunderstorm: "img/thunderstorm.png"
        };

        const iconSrc = iconMap[weatherCondition] || "img/sun.png";
        weatherImg.src = iconSrc;
        weatherImgs.src = iconSrc;

        // Affichage prévision 5 jours
        displayForecast(data);
    } catch (error) {
        console.error("Erreur :", error);
    }
}, () => {
    alert("Veuillez activer votre localisation et actualiser la page");
});

// ===============================
// Fonction d'affichage des prévisions cliquables
// ===============================
function displayForecast(data) {
    const dailyForecasts = {};
    const forecast = document.getElementById('future-forecast-box');
    const detailsForecast = document.getElementById('details-forecast');
    let forecastbox = "";

    const dayName = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
    const sunrise = new Date(data.city.sunrise * 1000).toLocaleTimeString();
    const sunset = new Date(data.city.sunset * 1000).toLocaleTimeString();

    data.list.forEach(item => {
        const date = item.dt_txt.split(' ')[0];
        const day = new Date(date).getDay();

        if (!dailyForecasts[date]) {
            dailyForecasts[date] = {
                day_today: dayName[day],
                temperature: Math.floor(item.main.temp) + "°",
                description: item.weather[0].description,
                weatherImg: item.weather[0].main.toLowerCase(),
                wind: item.wind.speed,
                humidity: item.main.humidity,
                pressure: item.main.pressure
            };
        }
    });

    for (const date in dailyForecasts) {
        const imgMap = {
            rain: "img/rain.png",
            clear: "img/clear.png",
            "clear sky": "img/clear.png",
            snow: "img/snow.png",
            clouds: "img/clouds.png",
            smoke: "img/clouds.png",
            mist: "img/mist1.png",
            haze: "img/haze.png",
            thunderstorm: "img/thunderstorm.png"
        };

        const imgSrc = imgMap[dailyForecasts[date].weatherImg] || "img/sun.png";

        forecastbox += `
            <div class="weather-forecast-box" onclick="showForecastDetails('${date}')">
                <div class="day-weather"><span>${dailyForecasts[date].day_today}</span></div>
                <div class="weather-icon-forecast"><img src="${imgSrc}" /></div>
                <div class="temp-weather"><span>${dailyForecasts[date].temperature}</span></div>
                <div class="weather-main-forecast">${dailyForecasts[date].description}</div>
            </div>`;
    }

    forecast.innerHTML = forecastbox;

    // Affichage détails au clic
    window.showForecastDetails = function (date) {
        const d = dailyForecasts[date];

        detailsForecast.innerHTML = `
            <h3>Détails météo pour ${d.day_today}</h3>
            <img src="img/${d.weatherImg}.png" alt="Météo">
            <p>🌡 Température : ${d.temperature}</p>
            <p>💧 Humidité : ${d.humidity}%</p>
            <p>💨 Vent : ${d.wind} m/s</p>
            <p>🌀 Pression : ${d.pressure} hPa</p>
            <p>🌅 Lever du soleil : ${sunrise}</p>
            <p>🌇 Coucher du soleil : ${sunset}</p>
            <button onclick="clearForecastDetails()">⬅ Revenir à la liste</button>
        `;
    };

    window.clearForecastDetails = function () {
        detailsForecast.innerHTML = "";
    };
}

// ===============================
// Mise à jour du fond selon la météo
// ===============================
function updateBackground(condition) {
    const body = document.body;
    body.className = "";

    if (condition.includes("Clear")) body.classList.add("sunny");
    else if (condition.includes("Rain")) body.classList.add("rainy");
    else if (condition.includes("Snow")) body.classList.add("snowy");
    else if (condition.includes("Clouds") || condition.includes("Mist") || condition.includes("Fog")) body.classList.add("cloudy");
    else if (condition.includes("Thunderstorm")) body.classList.add("thunderstorm");
    else if (condition.includes("Haze")) body.classList.add("hazy");
}
