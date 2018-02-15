var d = new Date();
var weekday = new Array(7);
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";


var weatherData;
var request = new XMLHttpRequest();
var City = 'Salt + Lake + City';

loadData();

function loadData() {
    request.open('GET', 'http://api.openweathermap.org/data/2.5/forecast/daily?q=' + City + ',us&units=imperial&cnt=5&appid=51992a83638d7a39f9981b57c2994295');
    request.onload = loadComplete;
    request.send();
}

function loadComplete(evt) {
    weatherData = JSON.parse(request.responseText);
    console.log(weatherData);
    document.getElementById("city").innerHTML = weatherData.city.name;
    var i;
    for (i = 0; i < weatherData.list.length; i = i + 1) {
        var day;
        if (d.getDay() + i == 7) {
            day = 0;
        } else if (d.getDay() + i == 8) {
            day = 1;
        } else if (d.getDay() + i == 9) {
            day = 2;
        } else if (d.getDay() + i == 10) {
            day = 3;
        } else if (d.getDay() + i == 11) {
            day = 4;
        } else if (d.getDay() + i == 12) {
            day = 5;
        } else if (d.getDay() + i == 13) {
            day = 6;
        } else {
            day = d.getDay() + i;
        }
        document.getElementById('day' + (i + 1).toString()).innerHTML = weekday[day];
        document.getElementById(i).innerHTML = weatherData.list[i].weather[0].description;
        var iconID = weatherData.list[i].weather[0].icon.toString();
        var icon = 'http://openweathermap.org/img/w/' + iconID + '.png';
        document.getElementById('icon' + i.toString()).src = icon;
        document.getElementById('temp' + i.toString()).innerHTML = weatherData.list[i].temp.day + "&deg; F";
    }
}

function sendData(form) {
    City = form.inputbox.value;
    loadData();
}