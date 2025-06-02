let apiKey = "18078e3e4d2cfcb500af8960eaae6090";



navigator.geolocation.getCurrentPosition(async function (position) {

    try {
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;
        //longitude and  latitude are used to get city name
        var map = await fetch (`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5&appid=${apiKey}&units=metric&lang=fr`)
        var userdata = await map.json();
        let loc = userdata[0].name;
        //By using City name  we can get the weather details of that particular city from OpenWeatherMap API
        let url = `https://api.openweathermap.org/data/2.5/forecast?&units=metric&lang=fr&`;
        let respond = await fetch(url + `q=${loc}&` + `appid=${apiKey}`);
        let data = await respond.json();

        console.log(data);
        
        // display current weather info
        let cityMain = document.getElementById("city-name");
        let cityTemp = document.getElementById("metric");
        let weatherMain = document.querySelectorAll("#weather-main");
        let mainHumidity = document.getElementById("humidity");
        let mainFeel = document.getElementById("feels-like");
        let weatherImg = document.querySelector(".weather-icon");
        let weatherImgs = document.querySelector(".weather-icons");
        let tempMinWeather = document.getElementById("temp-min-today");
        let tempMaxWeather = document.getElementById("temp-max-today");

        cityMain.innerHTML = data.city.name;
        cityTemp.innerHTML = Math.floor(data.list[0].main.temp) + "°";
        weatherMain[0].innerHTML = data.list[0].weather[0].description;
        weatherMain[1].innerHTML = data.list[0].weather[0].description;
        mainHumidity.innerHTML = Math.floor(data.list[0].main.humidity);
        mainFeel.innerHTML = Math.floor(data.list[0].main.feels_like);
        tempMinWeather.innerHTML = Math.floor(data.list[0].main.temp_min) + "°";
        tempMaxWeather.innerHTML = Math.floor(data.list[0].main.temp_max) + "°";

        let weatherCondition = data.list[0].weather[0].main.toLowerCase();

        if (weatherCondition === "rain") {
            weatherImg.src = "img/rain.png";
            weatherImgs.src = "img/rain.png";
        } else if (weatherCondition === "clear" || weatherCondition === "clear sky") {
            weatherImg.src = "img/clear.png";
            weatherImgs.src = "img/clear.png";
        } else if (weatherCondition === "snow") {
            weatherImg.src = "img/snow.png";
            weatherImgs.src = "img/snow.png";
        } else if (weatherCondition === "clouds" || weatherCondition === "smoke") {
<<<<<<< HEAD
            weatherImg.src = "img/clouds.png";
            weatherImgs.src = "img/clouds.png";
=======
            weatherImg.src = "img/15.cloud-light.png";
            weatherImgs.src = "img/15.cloud-light.png";
>>>>>>> 942b4f9d9553c288e2651e540633f46119451f16
        } else if (weatherCondition === "mist" || weatherCondition === "Fog") {
            weatherImg.src = "img/mist1.png";
            weatherImgs.src = "img/mist1.png";
        } else if (weatherCondition === "haze") {
            weatherImg.src = "img/haze.png";
            weatherImgs.src = "img/haze.png";
        } else if (data.weather[0].main === "Thunderstorm") {
            weatherImg.src = "img/thunderstorm.png";
            weatherImgs.src = "img/thunderstorm.png";
        }

        // Fetch and display 5-day forecast data
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${data.city.name}&appid=${apiKey}&units=metric&lang=fr`;

        fetch(forecastUrl)
            .then(response => response.json())
            .then(data => {
                console.log("5-Day Forecast for", data.city.name);
                displayForecast(data);
            })
            .catch(error => {
                console.error("Error fetching forecast:", error);
            });

<<<<<<< HEAD
=======
        function displayForecast(data) {
            const dailyForecasts = {};
            let forecast = document.getElementById('future-forecast-box');
            let forecastbox = "";

            data.list.forEach(item => {
                const date = item.dt_txt.split(' ')[0];
                let dayName = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
                let day = new Date(date).getDay();

                if (!dailyForecasts[date]) {
                    dailyForecasts[date] = {
                        day_today: dayName[day],
                        temperature: Math.floor(item.main.temp) + "°",
                        description: item.weather[0].description,
                        weatherImg: item.weather[0].main.toLowerCase()
                    };
                }
            });

            for (const date in dailyForecasts) {
                let imgSrc = "";

                switch (dailyForecasts[date].weatherImg) {
                    case "rain":
                        imgSrc = "img/rain.png";
                        break;
                    case "clear":
                    case "clear sky":
                        imgSrc = "img/sun.png";9
                        break;
                    case "snow":
                        imgSrc = "img/snow.png";
                        break;
                    case "clouds":
                    case "smoke":
                        imgSrc = "img/15.cloud-light.png";
                        break;
                    case "mist":
                        imgSrc = "img/mist.png";
                        break;
                    case "haze":
                        imgSrc = "img/haze.png";
                        break;
                    case "thunderstorm":
                        imgSrc = "img/thunderstorm.png";
                        break;
                    default:
                        imgSrc = "img/sun.png";
                }

                forecastbox += `
                <div class="weather-forecast-box">
                <div class="day-weather">
                <span>${dailyForecasts[date].day_today}</span>
                </div>
                    <div class="weather-icon-forecast">
                        <img src="${imgSrc}" />
                    </div>
                    <div class="temp-weather">
                        <span>${dailyForecasts[date].temperature}</span>
                    </div>
                    <div class="weather-main-forecast">${dailyForecasts[date].description}</div>
                </div>`;
            }

            forecast.innerHTML = forecastbox;

            console.log(data);
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
},
() => {
    // Handle location retrieval error
    alert("Veuillez activer votre localisation et actualiser la page");
});
>>>>>>> 942b4f9d9553c288e2651e540633f46119451f16

//   test fonction dynamique
function displayForecast(data) {
    const dailyForecasts = {};
    let forecast = document.getElementById('future-forecast-box');
    let forecastbox = "";
    let detailsForecast = document.getElementById("details-forecast");

    data.list.forEach(item => {
        const date = item.dt_txt.split(' ')[0];
        let dayName = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
        let day = new Date(date).getDay();

        if (!dailyForecasts[date]) {
            dailyForecasts[date] = {
                day_today: dayName[day],
                temperature: Math.floor(item.main.temp) + "°",
                description: item.weather[0].description,
                weatherImg: item.weather[0].main.toLowerCase(),
                fullData: item // Stocke toutes les infos météo pour ce jour
            };
        }
    });

    for (const date in dailyForecasts) {
        let imgSrc = "";

        switch (dailyForecasts[date].weatherImg) {
            case "rain":
                imgSrc = "img/rain.png";
                break;
            case "clear":
            case "clear sky":
                imgSrc = "img/clear.png";
                break;
            case "snow":
                imgSrc = "img/snow.png";
                break;
            case "clouds":
            case "smoke":
                imgSrc = "img/clouds.png";
                break;
            case "mist":
                imgSrc = "img/mist1.png";
                break;
            case "haze":
                imgSrc = "img/haze.png";
                break;
            case "thunderstorm":
                imgSrc = "img/thunderstorm.png";
                break;
            default:
                imgSrc = "img/sun.png";
        }

        forecastbox += `
        <div class="weather-forecast-box" onclick="showForecastDetails('${date}')">
            <div class="day-weather"><span>${dailyForecasts[date].day_today}</span></div>
            <div class="weather-icon-forecast"><img src="${imgSrc}" /></div>
            <div class="temp-weather"><span>${dailyForecasts[date].temperature}</span></div>
            <div class="weather-main-forecast">${dailyForecasts[date].description}</div>
        </div>`;
    }

    forecast.innerHTML = forecastbox;

    // Fonction pour afficher les détails météo sur la page
    window.showForecastDetails = function(date) {
        let selectedForecast = dailyForecasts[date];

        detailsForecast.innerHTML = `
        <h3>Détails météo pour ${selectedForecast.day_today}</h3>
        <img src="img/${selectedForecast.weatherImg}.png" alt="Météo">
        <p>🌡 Température : ${selectedForecast.temperature}</p>
        <p>💧 Humidité : ${selectedForecast.fullData.main.humidity}%</p>
        <p>💨 Vent : ${selectedForecast.fullData.wind.speed} m/s</p>
        <p>🌀 Pression : ${selectedForecast.fullData.main.pressure} hPa</p>
        <p>🌅 Lever du soleil : ${new Date(selectedForecast.fullData.sys.sunrise * 1000).toLocaleTimeString()}</p>
        <p>🌇 Coucher du soleil : ${new Date(selectedForecast.fullData.sys.sunset * 1000).toLocaleTimeString()}</p>
        <button onclick="clearForecastDetails()">⬅ Revenir à la liste</button>
        `;
    };

    // Fonction pour masquer les détails et revenir à la liste
    window.clearForecastDetails = function() {
        detailsForecast.innerHTML = "";
    };

    console.log(data);
}

// Ajout dans l'affichage de la météo
function displayCurrentWeather(data) {
    const temp = data.list[0].main.temp;
    updateBackground(temp);

    const cityBlock = document.getElementById('city-weather');
    cityBlock.innerHTML = `<h2>${data.city.name}</h2>
                        <p>${temp}°C - ${data.list[0].weather[0].description}</p>`;
}
        

//   // Simulation de la météo – à remplacer par des données réelles
        // let temperature = "30"; // Température fictive
        // let weatherCondition = "clear"; // Conditions météo fictives: "rain", "snow", "clear"
        
// / Fonction pour mettre à jour le fond du site selon la météo
function updateBackground(weatherCondition) {
    const body = document.body;
    
    // Nettoyer les classes avant d'en ajouter une nouvelle
    body.className = "";

    if (weatherCondition.includes("Clear")) {
        body.classList.add("sunny");
    } else if (weatherCondition.includes("Rain")) {
        body.classList.add("rainy");
    } else if (weatherCondition.includes("Snow")) {
        body.classList.add("snowy");
    } else if (weatherCondition.includes("Clouds") || weatherCondition.includes("Mist") || weatherCondition.includes("Fog")) {
        body.classList.add("cloudy");
    } else if (weatherCondition.includes("Thunderstorm")) {
        body.classList.add("thunderstorm");
    } else if (weatherCondition.includes("Haze")) {
        body.classList.add("hazy");
    }
}

// TEST: Fonction pour afficher la météo actuelle// TEST : Change manuellement la météo pour voir le fond
// const testWeatherConditions = ["Clear", "Rain", "Snow", "Clouds", "Thunderstorm", "Haze"];
// testWeatherConditions.forEach((condition, index) => {
//     setTimeout(() => {
//         updateBackground(condition);
//         console.log(`Test météo : ${condition}`);
//     }, index * 3000); // Change toutes les 3 secondes
// });
    }
    catch (error) {
        console.error("An error occurred:", error);
    }
},
() => {
    // Handle location retrieval error
    alert("Veuillez activer votre localisation et actualiser la page");
});