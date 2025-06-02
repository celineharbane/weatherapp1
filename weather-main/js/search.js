let apiKey = "18078e3e4d2cfcb500af8960eaae6090";
let searchinput = document.querySelector(`.searchinput`);

async function search(city, state, country){
    let url = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city},${state},${country}&appid=${apiKey}&units=metric&lang=fr`);

    if(url.ok){
    let data = await url.json();
    console.log(data);
    
    let box = document.querySelector(".return");
    box.style.display = "block";

    let message = document.querySelector(".message");
    message.style.display = "none";

    let errormessage = document.querySelector( ".error-message");
        errormessage.style.display = "none";

    let weatherImg = document.querySelector(".weather-img");
    document.querySelector(".city-name").innerHTML = data.name;
    document.querySelector(".weather-temp").innerHTML = Math.floor(data.main.temp) + '°';
    document.querySelector(".wind").innerHTML = Math.floor(data.wind.speed) + " m/s";
    document.querySelector(".pressure").innerHTML = Math.floor(data.main.pressure) + " hPa";
    document.querySelector('.humidity').innerHTML = Math.floor(data.main.humidity)+ "%";
    document.querySelector(".sunrise").innerHTML =  new Date(data.sys.sunrise * 1000).toLocaleTimeString([], {hour:"2-digit", minute:"2-digit"});
    document.querySelector(".sunset").innerHTML =  new Date(data.sys.sunset * 1000).toLocaleTimeString([], {hour:"2-digit", minute:"2-digit"});

    if (data.weather[0].main === "Rain") {
        weatherImg.src = "img/rain.png";
      } else if (data.weather[0].main === "Clear") {
        weatherImg.src = "img/sun.png";
      } else if (data.weather[0].main === "Snow") {
        weatherImg.src = "img/snow.png";
      } else if (
        data.weather[0].main === "Clouds" ||
        data.weather[0].main === "Smoke"
      ) {
        weatherImg.src = "img/15.cloud-light.png";
      } else if (
        data.weather[0].main === "Mist" ||
        data.weather[0].main === "Fog"
      ) {
        weatherImg.src = "img/mist1.png";
      } else if (data.weather[0].main === "Haze") {
        weatherImg.src = "img/haze.png";
      } else if (data.weather[0].main === "Thunderstorm") {
        weatherImg.src = "img/thunderstorm.png";
      }
    } else {
      let box = document.querySelector(".return");
      box.style.display = "none";

      let message = document.querySelector(".message");
      message.style.display = "none";

      let errormessage = document.querySelector(".error-message");
      errormessage.style.display = "block";
    }
}


searchinput.addEventListener('keydown', function(event) {
    if (event.keyCode === 13 || event.which === 13) {
        search(searchinput.value);
        console.log("worked")
      }
  });


  //   test fonction dynamique
function updateBackground(temp) {
    const body = document.body;

    if (temp >= 30) {
        body.className = "hot"; // Températures élevées
    } else if (temp >= 15) {
        body.className = "warm"; // Températures douces
    } else if (temp >= 5) {
        body.className = "cool"; // Temps frais
    } else {
        body.className = "cold"; // Temps froid
    }
}

// Ajout dans l'affichage de la météo
function displayCurrentWeather(data) {
    const temp = data.list[0].main.temp;
    updateBackground(temp);

    const cityBlock = document.getElementById('city-weather');
    cityBlock.innerHTML = `<h2>${data.city.name}</h2>
                          <p>${temp}°C - ${data.list[0].weather[0].description}</p>`;
}
