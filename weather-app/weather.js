const apiKey = "9836ed0a0e9a178f82fadbc8128841d0";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const errorMessage = document.querySelector(".error");



async function checkWeather(city) {

  const response = await fetch(apiUrl + `&q=${city}` + `&appid=${apiKey}`);

  if(response.status == 404){
    errorMessage.style.display = "block";
    document.querySelector(".weather").style.display = "none";
  }

  else {

  var data = await response.json();

  //console.log(data);

  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
  document.querySelector(".humidity").innerHTML = Math.round(data.main.humidity) + "%";
  document.querySelector(".wind").innerHTML = Math.round(data.wind.speed) + " km/hr";

  if(data.weather[0].main == 'Clouds'){
    weatherIcon.src = "images/clouds.png";
  }
  else if(data.weather[0].main == "Clear"){
    weatherIcon.src = "images/clear.png";
  }
  else if(data.weather[0].main == "Rain"){
    weatherIcon.src = "images/rain.png";
  }
  else if(data.weather[0].main == "Drizzle"){
    weatherIcon.src = "images/drizzle.png";
  }
  else if(data.weather[0].main == 'Mist'){
    weatherIcon.src = "images/mist.png";
  }
  else if(data.weather[0].main == 'Snow'){
    weatherIcon.src = "images/snow.png";
  }

document.querySelector(".weather").style.display = "block";
 //this will overrun the css style of display none
document.querySelector(".error").style.display = "none";
}    
}

searchBtn.addEventListener("click" ,()=>{

checkWeather(searchBox.value); //getting the data from the inner input field

});

searchBox.addEventListener("keydown",(event)=>{



if(event.key=== 'Enter'){
  checkWeather(searchBox.value);
}
});


