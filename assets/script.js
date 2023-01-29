var apiKey = "880c668a67c5fcb81fdb410e76fe8763";
var forecast = $("#forecast");
var input = $(".form-input");
var currentcity = $("#currentcity");
var currenttemp = $("#currenttemp");
var currentwind = $("#currentwind");
var currenthumid = $("#currenthumid");



var today = moment().format("GGGG-MM-DD");
var todayDay = parseInt(moment().format("DD"))+1;


var city;
var lat;
var lon;
var counter;

$("#search-button").on("click", function() {
city = input.val();
var queryUrlGeocode = "http://api.openweathermap.org/geo/1.0/direct?q="+city+"&limit=1&appid="+apiKey;
$.ajax({
  url: queryUrlGeocode,
  method: "GET"
}).then(function(response) {
    var lat = response[0].lat;
    var lon = response[0].lon;
    var queryUrlWeather = "http://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&appid="+apiKey;

    $.ajax({
        url: queryUrlWeather,
        method: "GET"
    }).then(function(response) {
        console.log(response)
        for(var i =0; i<response.list.length;i++)
            {
                var date = response.list[i].dt_txt
                var dayarr = date.split("-")
                var day = dayarr[2].charAt(0)+dayarr[2].charAt(1)
                
                if(day.includes(todayDay))
                    {
                        var counter = i;
                        break;
                    }
            }
            currentcity.text(response.city.name)
            currenttemp.text("Temp: "+response.list[0].main.temp)
            currentwind.text("Wind Speed: "+response.list[0].wind.speed)
            currenthumid.text("Humidity: "+response.list[0].main.humidity)

            var addition = 0;
            for(var i =0; i<5;i++)
            {
                
                var forecastdiv = $('<div>');
                var header = $('<h3>');
                var icon = $('<img>');
                var temp = $('<p>');
                var wind = $('<p>');
                var humidity = $('<p>');
                
                header.text(response.list[counter+addition].dt_txt);
                temp.text("Temp: "+response.list[counter+addition].main.temp);
                wind.text("Wind Speed: "+response.list[counter+addition].wind.speed);
                humidity.text("Humidity: "+response.list[counter+addition].main.humidity);
            
                forecastdiv.addClass("forecastdiv")
            
                forecastdiv.append(header);
                forecastdiv.append(icon);
                forecastdiv.append(temp);
                forecastdiv.append(wind);
                forecastdiv.append(humidity);
            
                forecast.append(forecastdiv);
                addition+=8;
            }
    });
    });
});







