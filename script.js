document.getElementById("cityInput").addEventListener("keydown", (e) => {
    if (e.keyCode === 13){
        main();
    }
})

function main(){
    getWeather();
}
function fadeCloudsIn(){
    document.getElementById("cloud1").style.animation="fadeIn 1s linear";
    document.getElementById("cloud2").style.animation="fadeIn 1s linear";
    document.getElementById("cloud3").style.animation="fadeIn 1s linear";
    document.getElementById("cloud4").style.animation="fadeIn 1s linear";
    document.getElementById("cloud5").style.animation="fadeIn 1s linear";
    document.getElementById("cloud6").style.animation="fadeIn 1s linear";
    document.getElementById("cloud7").style.animation="fadeIn 1s linear";
    document.getElementById("clouds").className ="show";
    setTimeout(function(){
        document.getElementById("cloud1").style.animation="slide 170s linear infinite";
        document.getElementById("cloud2").style.animation="slide 170s linear infinite";
        document.getElementById("cloud3").style.animation="slide 170s linear infinite";
        document.getElementById("cloud4").style.animation="slide 170s linear infinite";
        document.getElementById("cloud5").style.animation="slide 170s linear infinite";
        document.getElementById("cloud6").style.animation="slide 170s linear infinite";
        document.getElementById("cloud7").style.animation="slide 170s linear infinite";
    }, 1000);
}
function fadeCloudsOut(){
    document.getElementById("cloud1").style.animation="fadeOut 1s linear";
    document.getElementById("cloud2").style.animation="fadeOut 1s linear";
    document.getElementById("cloud3").style.animation="fadeOut 1s linear";
    document.getElementById("cloud4").style.animation="fadeOut 1s linear";
    document.getElementById("cloud5").style.animation="fadeOut 1s linear";
    document.getElementById("cloud6").style.animation="fadeOut 1s linear";
    document.getElementById("cloud7").style.animation="fadeOut 1s linear";
    setTimeout(function(){
        document.getElementById("clouds").className ="hide";
    }, 1000);
}
function sunIn(){
    document.getElementById("daytimesun").style.animation="sunIn 3s linear";
    document.getElementById("daytimesun").style.animationFillMode = "forwards";
}
function sunOut(){
    document.getElementById("daytimesun").style.animation="sunOut 2s linear";
    document.getElementById("daytimesun").style.animationFillMode = "forwards";
}
function rainIn(){
    document.getElementById("rainbg").style.left ="-10%";
    document.getElementById("rainbg").style.top ="-150%";

    document.getElementById("rainbg").style.animation="fadeIn 1s linear";
    setTimeout(function(){
        document.getElementById("rainbg").className ="show";
        document.getElementById("rainbg").style.animation="rain 0.5s linear infinite";

    }, 1000);
}
function rainOut(){
    document.getElementById("rainbg").style.animation="fadeOut 1s linear";
    setTimeout(function(){
        document.getElementById("rainbg").className ="hide";
    }, 1000);

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
            sunIn();
            document.getElementById("stars").style.animation="fadeOut 1s linear";
            setTimeout(function(){
                document.getElementById("stars").className ="hide";
            }, 1000);

        var color = window.getComputedStyle( document.body ,null).getPropertyValue('background-color');  
            if (color === "rgb(17, 17, 60)"){
                document.body.style.animation="nighttoday 1s linear";
            }
            document.body.style.backgroundColor = "rgb(131, 179, 245)";

            if(desc.includes("clear")){
                image.src = "sunny.png";
                fadeCloudsOut();
                rainOut();
            }
            else if(desc.includes("cloud")){
                image.src = "cloudy.png";
                fadeCloudsIn();
                rainOut();
            }
            else if(desc.includes("rain")){
                image.src = "rain.png";
                fadeCloudsIn();
                rainIn();
            }
            else if(desc.includes("mist")){
                image.src = "daymist.png";
                rainOut();

            }
            else if(desc.includes("thunder")){
                image.src = "thunder.png";
                rainIn();
            }
        }
        else{

            var color = window.getComputedStyle( document.body ,null).getPropertyValue('background-color');  
            if (color === "rgb(131, 179, 245)"){
                document.body.style.animation="daytonight 1s linear";
                sunOut();
            }
            document.getElementById("stars").style.animation="fadeIn 1s linear";
            setTimeout(function(){
                document.getElementById("stars").className = ".show";
            }, 1000);
            document.body.style.backgroundColor = "rgb(17, 17, 60)";
            
            if(desc.includes("clear")){
                image.src = "moon.png";
                desc = "Clear";
                fadeCloudsOut();
                rainOut();
            }
            else if(desc.includes("cloud")){
                image.src = "cloudynight.png";
                fadeCloudsIn();
                rainOut();

            }
            else if(desc.includes("rain")){
                image.src = "rain.png";
                fadeCloudsIn();
                rainIn();
            }
            else if(desc.includes("mist")){
                image.src = "nightmist.png";
                fadeCloudsIn();
            }
            else if(desc.includes("thunder")){
                image.src = "thunder.png";
                fadeCloudsIn();
                rainIn();
            }
        }
        let descriptionStrings = desc.split(" ");
        desc = ""
        for (let i = 0; i < descriptionStrings.length; i++){
            descriptionStrings[i] = descriptionStrings[i][0].toUpperCase() + descriptionStrings[i].substr(1);
            desc += descriptionStrings[i] + " ";
        }
        document.querySelector('#errormessage').innerHTML = "";
        document.querySelector('#cityName').innerHTML = cityName.toUpperCase();
        document.querySelector('#temperature').innerHTML = temp.toString().toUpperCase() + "°F";
        document.querySelector('#description').innerHTML = "Current Forecast:  " + desc;
        document.querySelector('#low').innerHTML = "Low: " + low.toString().toUpperCase() + "°F";
        document.querySelector('#high').innerHTML = "High: " + high.toString().toUpperCase() + "°F";
        document.querySelector("#cityInput").className = "resultCityInput";
        document.querySelector("#results").className = ".show";
    }
        else{
            document.querySelector('#errormessage').innerHTML = "City not found!";
        }
    }
    request.send();
}