const d = new Date();
const todayDayNumber = d.getDay();

let forecastDayNumber = todayDayNumber;

const myweekday = new Array(7);
myweekday[0] ="Sunday";
myweekday[1] ="Monday";
myweekday[2] ="Tuesday";
myweekday[3] ="Wednesday";
myweekday[4] ="Thursday";
myweekday[5] ="Friday";
myweekday[6] ="Saturday";

// ADD the key and change units to imperial
const apiURL= "//api.openweathermap.org/data/2.5/forecast?zip=92029,us&appid=0a1fdaeb2b95ecdd52f9961f1bfbfbdb&units=imperial";
const currentWeatherURL = "//api.openweathermap.org/data/2.5/weather?zip=92029,us&appid=0a1fdaeb2b95ecdd52f9961f1bfbfbdb&units=imperial";

// Fetch the current weather data
fetch(currentWeatherURL)
.then((response) => response.json())
.then((currentWeather) => {
    let temperature = Math.round(currentWeather.main.temp); // round the temperature
    document.getElementById('currentTemp').innerHTML = temperature;
    document.getElementById('windSpeed').innerHTML = currentWeather.wind.speed;
    let iconcode = currentWeather.weather[0].icon;
    let iconPath = "//openweathermap.org/img/w/"+ iconcode + ".png";
    document.getElementById('weather_icon').src=iconPath;

    // Fetch the forecast data after getting the current weather
    return fetch(apiURL);
})
.then((response) => response.json())
.then((weatherInfo) => {
    document.getElementById('place').innerHTML=weatherInfo.city.name;

    let mylist = weatherInfo.list;
    
    for (i = 0;i < mylist.length; i++) {
        let time = mylist[i].dt_txt;
        if (time.includes('18:00:00')) {
            forecastDayNumber += 1; 
            if (forecastDayNumber === 7) {
                forecastDayNumber = 0;
            }

            let theDayName = document.createElement("span");
            theDayName.textContent = myweekday[forecastDayNumber];

            let theTemp = document.createElement("p");
            let temperature = Math.round(weatherInfo.list[i].main.temp); // round the temperature
            theTemp.textContent = temperature + "\xB0";
            
            let iconcode = weatherInfo.list[i].weather[0].icon;
            let iconPath = "//openweathermap.org/img/w/"+ iconcode + ".png";
            let theIcon = document.createElement("img");
            theIcon.src=iconPath;

            let theDay = document.createElement("div");
            theDay.appendChild(theDayName);
            theDay.appendChild(theTemp);
            theDay.appendChild(theIcon); 

            document.getElementById('weatherforecast').appendChild(theDay);

            
        } // end if
    } // end for
}); // end of "then" fat arrow function
