const inputBox = document.querySelector(".input-box")
const searchBtn = document.getElementById("searchBtn")
const weather_img = document.querySelector(".weather-img")
const temperature = document.querySelector(".temperature")
const description = document.querySelector(".description")
const humidity = document.getElementById("humidity")
const wind_speed = document.getElementById("wind-speed")
const weatherBody = document.querySelector(".weather-body")
const locationNotFound = document.querySelector(".location-not-found")


async function checkWeather(city){
   const api_key = "1269b6afe2731a2d777cc5f7777e5018"
   const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`

   const weather_data = await fetch(`${url}`).then(response => 
    response.json())

    if(weather_data.cod === '404'){
       locationNotFound.style.display = 'flex'
       weatherBody.style.display = 'none'
       return
    }else{
        locationNotFound.style.display = 'none'

    }

    weatherBody.style.display = 'flex'

    temperature.innerHTML = `${(weather_data.main.temp - 273.15).toFixed(2)}<sup> °C<sup>`
    humidity.innerHTML = `${weather_data.main.humidity} %`
    wind_speed.innerHTML = `${weather_data.wind.speed} K/Hr`
    description.innerHTML = `${weather_data.weather[0].description}`

  

   switch(weather_data.weather[0].main){
    case 'Clouds':
      weather_img.src = '/Project1-Weather-App/images/cloud.png'
      break;
    case 'Clear':
      weather_img.src = '/Project1-Weather-App/images/clear.png'
      break;
    case 'Rain':
      weather_img.src = '/Project1-Weather-App/images/rain.png'
      break;
    case 'Mist':
      weather_img.src = '/Project1-Weather-App/images/mist.png'
      break;
    case 'Snow':
      weather_img.src = '/Project1-Weather-App/images/snow.png'
      break;
   }


}

searchBtn.addEventListener("click",() => {
    checkWeather(inputBox.value)
})