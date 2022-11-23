//variables
const apiKey = 'fd97b0c20a0ed34f3648934eaad0be5d';
const apiKey2 = 0;
const date = new Date();
let coords = {
    lat:0,
    lon:0
};
let degree ='°C';
let latitudeCurrent;
let longitudeCurrent;

// elements
const locationName = document.querySelector(".location-name");
const currentTemperature = document.querySelector(".main-temperature");
const weather = document.querySelector('.main-weather');
const iconElement = document.querySelector('.weather-icon');
const dayElement = document.querySelector('.main__bottom-day');
const myLocationElement = document.querySelector('.my_location');

const windElement = document.querySelector('.wind-speed');
const humidityElement = document.querySelector('.humidity');
const humidityBar = document.querySelector('.humidity__bar');
const visibilityElement = document.querySelector('.visibility');
const pressureElement = document.querySelector('.pressure');

const celsiusButton = document.querySelector('.celsius-button');
const faButton = document.querySelector('.fa-button');
const mainCelsius = document.querySelector('.main-temperature__celsius');
const mainFa = document.querySelector('.main-temperature__fa');
const searchMain = document.querySelector('.search-main');
const mainContainer = document.querySelector('.main__container');

const searchContainer = document.querySelector('.search');
const searchClose = document.querySelector('.search__close');
const barcelonaButton = document.querySelector('.barcelona-button');
const beloButton = document.querySelector('.belo-button');
const bogotaButton = document.querySelector('.bogota-button');
const dubaiButton = document.querySelector('.dubai-button');
const limaButton = document.querySelector('.lima-button');
const londonButton = document.querySelector('.london-button');
const miamiButton = document.querySelector('.miami-button');
const parisButton = document.querySelector('.paris-button');

const daysForecast = document.querySelectorAll(".days__item")

//functions
const fetchData = position =>{
    const {latitude, longitude} = position.coords;
    coords.lat = position.coords.latitude;
    coords.lon = position.coords.longitude;
    latitudeCurrent = coords.lat;
    longitudeCurrent = coords.lon;
    callAPI(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${apiKey}`, `https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=${latitude}&lon=${longitude}&appid=${apiKey}`);
}

const callAPI = (url, forecast)=>{
    fetch(url)
    .then(response => response.json())
    .then(data => setWeatherData(data))
    .catch(err => {
        console.log(err);
    });

    fetch(forecast)
    .then(response => response.json())
    .then(data => setForecast(data))
    .catch(err => {
        console.log(err);
    });
}


const onLoad = () =>{
    navigator.geolocation.getCurrentPosition(fetchData);
}

//set the main and some features of the description.
const setWeatherData = data =>{
    locationName.textContent = data.name;
    currentTemperature.textContent = data.main.temp;
    weather.textContent = data.weather[0].main;
    iconElement.innerHTML = `
    <img src="icons/${data.weather[0].icon}.png">
    `;
    windElement.textContent = data.wind.speed;
    humidityElement.textContent = data.main.humidity;
    visibilityElement.textContent = data.visibility;
    pressureElement.textContent = data.main.pressure;
    humidityBar.style.width = `${data.main.humidity}%`;
}

// set the forecast
const setForecast = data => {
    for (let i=0;i<daysForecast.length;i++){
        daysForecast[i].childNodes[1].textContent = data.list[i].dt_txt; //date
        daysForecast[i].childNodes[3].innerHTML = `<img src="icons/${data.list[i].weather[0].icon}.png">`; //icon
        daysForecast[i].childNodes[5].childNodes[1].textContent = data.list[i].main.temp_max + degree; //temp_max
        daysForecast[i].childNodes[5].childNodes[3].textContent = data.list[i].main.temp_min + degree; //temp_min
    }
}


/* EVENTS */
// button my_location
myLocationElement.addEventListener('click',()=>{
    callAPI(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}`,`https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}`);
    latitudeCurrent = coords.lat;
    longitudeCurrent = coords.lon;
})

//search button in the main part
searchMain.addEventListener('click',()=>{
    searchContainer.style.display = 'flex';
    mainContainer.style.display = 'none'
}
)

//button to close the search part
searchClose.addEventListener('click',()=>{
    searchContainer.style.display = 'none';
    mainContainer.style.display = 'flex'
})

/* Calculate date of today */
//set TODAY
let weekDay = ['Sun','Mon', 'Tue', 'Wed','Thur','Fri','Sat'];
let month = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

dayElement.textContent = `Today - ${weekDay[date.getDay()]}, ${date.getDate()} ${month[date.getMonth()]}`;

//carousel

window.addEventListener('load', function(){
    new Glider(document.querySelector('.carousel__list'), {
        slidesToShow: 2,
        slidesToScroll: 2,
        draggable: true,
        dots: '.carousel__indicators',
        arrows: {
          prev: '.carousel__previous',
          next: '.carousel__next'
        },
        responsive: [
            {
              // screens greater than >= 775px
              breakpoint: 775,
              settings: {
                // Set to `auto` and provide item width to adjust to viewport
                slidesToShow: 4,
                slidesToScroll: 4,
              }
            },{
              // screens greater than >= 1024px
              breakpoint: 1024,
              settings: {
                slidesToShow: 5,
                slidesToScroll: 5,
              }
            }
          ]
    });
})

//search

document.addEventListener('keyup', e=>{

    if(e.target.matches(".search__input")){
        document.querySelectorAll(".option").forEach(el =>{
            el.textContent.toLowerCase().includes(e.target.value.toLowerCase())
                ?el.classList.remove("filter")
                :el.classList.add("filter")
        })
    }
    
})

/* Cities Class */

class CityCoords {
    constructor(latitude, longitude){
        this.latitude = latitude,
        this.longitude = longitude
    }

    latitude(){
        return this.latitude;
    }

    longitude(){
        return this.longitude;
    }
}

function city(nameVariable, nameButton){
    nameButton.addEventListener('click',()=>{
    degree = '°C'
    callAPI(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${nameVariable.latitude}&lon=${nameVariable.longitude}&appid=${apiKey}`,`https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=${nameVariable.latitude}&lon=${nameVariable.longitude}&appid=${apiKey}`);
    latitudeCurrent = nameVariable.latitude;
    longitudeCurrent = nameVariable.longitude;
})
}

const barcelona = new CityCoords(41.3887,2.1589);
city(barcelona,barcelonaButton);

const belo = new CityCoords(-19.9208,-43.9377);
city(belo,beloButton);

const bogota = new CityCoords(4.6097,-74.0817);
city(bogota,bogotaButton);

const dubai = new CityCoords(25.0657,55.1712);
city(dubai,dubaiButton);

const lima = new CityCoords(-12.0431,-77.0282);
city(lima,limaButton);

const london = new CityCoords(51.5085,-0.1257);
city(london,londonButton);

const miami = new CityCoords(25.7751,-80.2105);
city(miami,miamiButton);

const paris = new CityCoords(48.8534,2.3488);
city(paris,parisButton);

celsiusButton.addEventListener('click',()=>{
    degree = '°C';
    mainCelsius.style.display = 'inline-block';
    mainFa.style.display = 'none';
    callAPI(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitudeCurrent}&lon=${longitudeCurrent}&appid=${apiKey}`,`https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=${latitudeCurrent}&lon=${longitudeCurrent}&appid=${apiKey}`);
})

faButton.addEventListener('click',()=>{
    degree = '°F';
    mainCelsius.style.display = 'none';
    mainFa.style.display = 'inline-block';
    callAPI(`https://api.openweathermap.org/data/2.5/weather?lat=${latitudeCurrent}&lon=${longitudeCurrent}&appid=${apiKey}`,`https://api.openweathermap.org/data/2.5/forecast?lat=${latitudeCurrent}&lon=${longitudeCurrent}&appid=${apiKey}`);
})