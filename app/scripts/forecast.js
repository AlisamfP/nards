//loads forecast.io into a div


//setup weather api
var lat = "33.414838";
var lon = "-111.834527";
var forecast_name = "Downtown Mesa";

//finds #forecast div and inserts iframe from forecast.io
$(document).ready(function() {
    $("#forecast").html('<iframe style="color: white" id="forecast_embed" type="text/html" frameborder="0" height="245" width="100%" src="http://forecast.io/embed/#lat=' + lat + "&lon=" + lon + "&name=" + forecast_name + '&color=#FFFFFFfont=Georgia&units=us"> </iframe>');
});