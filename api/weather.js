document.querySelector(".cityInput").addEventListener("keydown", (e) => {
    if (e.keyCode === 13){
        main();
    }
})

function main(){
    getWeather();
}

function getWeather(){
    var cityName = document.getElementById("cityInput").value;
    var key = "2a216c48999dbe58000d0dad02f5dbcf"
    link = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&units=metric&apikey="+key;
    var request = new XMLHttpRequest();
    request.open('GET',link,true);
    request.onload = function(){
    var obj = JSON.parse(this.response);
    if (request.status >= 200 && request.status < 400) {
        var temp = Math.round(1.8 * (obj.main.temp) + 32);
        var desc = obj.weather[0].description;
        var timestamp = obj.dt * 1000;
        var offset =  obj.timezone * 1000
        var sunrise = (obj.sys.sunrise * 1000) + offset;
        var sunset = (obj.sys.sunset  *1000) + offset;
        var low = Math.round(1.8 * (obj.main.temp_min) + 32);
        var high = Math.round(1.8 * (obj.main.temp_max) + 32);
        timestamp = timestamp + offset;
        var image = document.getElementById("weather_icon");
        if (timestamp >= sunrise && timestamp <= sunset){
            if(desc.includes("clear")){
                image.src = "sunny.png";
                desc = "Clear";
            }
            else if(desc.includes("cloud")){
                image.src = "cloudy.png";
            }
            else if(desc.includes("rain")){
                image.src = "rain.png";
            }
            else if(desc.includes("mist")){
                image.src = "daymist.png";
            }
            else if(desc.includes("thunder")){
                image.src = "thunder.png";
            }
        }
        else{
            if(desc.includes("clear")){
                image.src = "moon.png";
                desc = "Clear";
            }
            else if(desc.includes("cloud")){
                image.src = "cloudynight.png";
            }
            else if(desc.includes("rain")){
                image.src = "rain.png";
            }
            else if(desc.includes("mist")){
                image.src = "nightmist.png";
            }
            else if(desc.includes("thunder")){
                image.src = "thunder.png";
            }
        }
        let descriptionStrings = desc.split(" ");
        desc = ""
        for (let i = 0; i < descriptionStrings.length; i++){
            descriptionStrings[i] = descriptionStrings[i][0].toUpperCase() + descriptionStrings[i].substr(1);
            desc += descriptionStrings[i] + " ";
        }

        document.querySelector('#errormessage').innerHTML = "";
        document.querySelector('.cityName').innerHTML = cityName.toUpperCase();
        document.querySelector('.temperature').innerHTML = temp.toString().toUpperCase() + "°F";
        document.querySelector('.description').innerHTML = "Current Forecast:  " + desc;
        document.querySelector('.low').innerHTML = "Low: " + low.toString().toUpperCase() + "°F";
        document.querySelector('.high').innerHTML = "High: " + high.toString().toUpperCase() + "°F";
        document.getElementById("cityInput").className = "resultCityInput";
        document.getElementById("results").className = ".show";
    }
        else{
            document.querySelector('#errormessage').innerHTML = "City not found!";
        }
    }
    request.send();
}