var forecast = $("#forecast");




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