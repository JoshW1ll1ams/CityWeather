var apiKey = "880c668a67c5fcb81fdb410e76fe8763";
var forecast = $("#forecast");
var input = $(".form-input");
var today = moment().format("GGGG-MM-DD HH:00:00");
console.log(today)

var city;
var lat;
var lon;

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
    });
    });
});














for(var i =0; i<5;i++)
{
    var forecastdiv = $('<div>');
    var header = $('<h3>');
    var icon = $('<img>');
    var temp = $('<p>');
    var wind = $('<p>');
    var humidity = $('<p>');

    header.text("1/1/1");
    temp.text("Temp: 16.90");
    wind.text("Wind: 16.90");
    humidity.text("Humidity: 16.90");

    forecastdiv.addClass("forecastdiv")

    forecastdiv.append(header);
    forecastdiv.append(icon);
    forecastdiv.append(temp);
    forecastdiv.append(wind);
    forecastdiv.append(humidity);

    forecast.append(forecastdiv);
}
