var apiKey = "880c668a67c5fcb81fdb410e76fe8763";
var forecast = $("#forecast");
var input = $(".form-input");
var currentcity = $("#currentcity");
var currenttemp = $("#currenttemp");
var currentwind = $("#currentwind");
var currenthumid = $("#currenthumid");
var buttonlist = $(".buttonlist");



var today = moment().format("GGGG-MM-DD");
var todayDay = parseInt(moment().format("DD"))+1;


var city;
var lat;
var lon;
var counter;
// var count = localStorage.getItem("counter")

$("#search-button").on("click", function() {
city = input.val();
run()
var HistoryButton = $('<button>');
HistoryButton.addClass("btn search-button")
HistoryButton.attr('id', 'history-button');
HistoryButton.attr('data-id', input.val());
HistoryButton.text(city)
buttonlist.append(HistoryButton)
localStorage.setItem(count,document.getElementById("history-button").outerHTML)
localStorage.setItem("counter",count+1)
});
localStorage.clear();
// for(var i = 0; i < count; i++)
// {
//     console.log(count)
//     var thisSaved = localStorage.getItem(i)
//     var button = $(thisSaved);
//     buttonlist.append(button)
// }


$(document.body).on('click', '#history-button' ,function(){
     city = $(this).data().id;
     run()
});



function run()
{  
var queryUrlGeocode = "http://api.openweathermap.org/geo/1.0/direct?q="+city+"&limit=1&appid="+apiKey;
$.ajax({
  url: queryUrlGeocode,
  method: "GET"
}).then(function(response) {
    var lat = response[0].lat;
    var lon = response[0].lon;
    var queryUrlWeather = "http://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&appid="+apiKey+"&units=metric";

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
            currenttemp.text("Temp: "+response.list[0].main.temp+"°C")
            currentwind.text("Wind Speed: "+response.list[0].wind.speed)
            currenthumid.text("Humidity: "+response.list[0].main.humidity)

            var addition = 0;
            forecast.empty();
            for(var i =0; i<5;i++)
            {
                var forecastdiv = $('<div>');
                var header = $('<h3>');
                var icon = $('<img>');
                var temp = $('<p>');
                var wind = $('<p>');
                var humidity = $('<p>');
                
                var forecastDate = response.list[counter+addition].dt_txt.slice(5,10)
                header.text(forecastDate);
                temp.text("Temp: "+response.list[counter+addition].main.temp+"°C");
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
}


