console.log('salut');
var weatherContainer = document.querySelector('.weather');

var btn = document.querySelector('.btn');
var search_bar = document.querySelector('.search_bar');
var search_btn = document.querySelector('.search_btn');


function renderWeather(data){

    document.querySelector('.weather__name').innerHTML = `${data.name}`;
    document.querySelector('.weather_mood').innerHTML = `${data.weather[0].description}`;
    document.querySelector('.weather__temp').innerHTML = `${(data.main.temp-273.15).toFixed(1)}°C`;
    document.querySelector('.weather__icon').innerHTML = `<img src="${data.weather[0].icon}.png" class="img">`;
    document.querySelector('.weather__pp').innerHTML = `<ion-icon name="umbrella-outline" style="color:lightblue"></ion-icon> Humidity: ${data.main.humidity}%`;
    document.querySelector('.weather__wind').innerHTML = `<ion-icon name="return-down-forward-outline" style="color:lightblue"></ion-icon> Wind: ${(data.wind.speed).toFixed(2)}km/h`;

    document.body.style.backgroundImage =`url(https://source.unsplash.com/1600x900/?${data.name})`;
}

function renderError(msg){
    document.querySelector('.weather__name').innerHTML = `${msg}`;
    document.querySelector('.weather_time').innerHTML = `Mon, 01:00 PM, N/A`;
    document.querySelector('.weather__temp').innerHTML = `N/A°C`;
    document.querySelector('.weather__icon').innerHTML = `N/A`;
    document.querySelector('.weather__pp').innerHTML = `<ion-icon name="umbrella-outline" style="color:lightblue"></ion-icon> Humidity: N/A%`;
    document.querySelector('.weather__wind').innerHTML = `<ion-icon name="return-down-forward-outline" style="color:lightblue"></ion-icon> Wind: N/Akm/h`;
}
function renderTime(dataTime){
    document.querySelector('.weather_time').innerHTML = `${dataTime.formatted}`;
}

function renderForecast(dataPrognoza){
    document.querySelector('.forecast_temp1').innerHTML = `${(dataPrognoza.list[8].main.temp-273.15).toFixed(1)}°C`;
    console.log(dataPrognoza.list[8].dt_txt);
    document.querySelector('.weather__icon1').innerHTML = `<img src="${dataPrognoza.list[8].weather[0].icon}.png" class="img">`;




    document.querySelector('.forecast_temp2').innerHTML = `${(dataPrognoza.list[16].main.temp-273.15).toFixed(1)}°C`;
    console.log(dataPrognoza.list[16].dt_txt);
    document.querySelector('.weather__icon2').innerHTML = `<img src="${dataPrognoza.list[16].weather[0].icon}.png" class="img">`;




    document.querySelector('.forecast_temp3').innerHTML = `${(dataPrognoza.list[24].main.temp-273.15).toFixed(1)}°C`;
    console.log(dataPrognoza.list[24].dt_txt);
    document.querySelector('.weather__icon3').innerHTML = `<img src="${dataPrognoza.list[24].weather[0].icon}.png" class="img">`;
}


async function weatherApp(city){
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
        const prognoza = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`)

        const dataPrognoza = await prognoza.json();
        console.log(dataPrognoza);
        renderForecast(dataPrognoza);
        const data = await response.json();
        console.log(data);
        //console.log(data.coord.lon);
        //console.log(data.coord.lat);
        if(!response.ok) { 
            alert('City not found!');
            throw new Error('City not found!');
        }
        renderWeather(data);
        const res = await fetch(`http://api.timezonedb.com/v2.1/get-time-zone?key=${apiKey}1&format=json&by=position&lat=${data.coord.lat}&lng=${data.coord.lon}`);
        const dataTime = await res.json();
        console.log(dataTime.formatted);
        renderTime(dataTime);
        
    } catch(err){
        console.error(`${err}⚠️⚠️⚠️`);
        renderError('City not found!');
    }
}

weatherApp('Moscow');

search_btn.addEventListener('click',function(){
    if(search_bar.value === ''){
    alert('Please enter a city');
    }else{
          console.log(search_bar.value);

    weatherApp(`${search_bar.value}`);
    search_bar.value="";
    }


  
});


search_bar.addEventListener('keyup',function(e){
    if(search_bar.value === ''){
        alert('Please enter a city');
        }else{
            if(e.key==="Enter"){
        weatherApp(`${search_bar.value}`);
        search_bar.value="";
    } 
        }
});




