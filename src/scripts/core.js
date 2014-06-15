//global variables
var currentAnnouncement = 0;
var announcementCount = 0;

//load weather widget into #forecast div
$(document).ready(function() {
    $("#forecast").html('<iframe style="color: white" id="forecast_embed" type="text/html" frameborder="0" height="245" width="100%" src="http://forecast.io/embed/#lat=' + lat + "&lon=" + lon + "&name=" + forecast_name + '&color=#FFFFFFfont=Georgia&units=us"> </iframe>')
});


//Get announcements
function getAnnouncements() {
    $.getJSON(announcementSource, function(data) {
        $('#announce').fadeOut(function() {
            if (announcementCount == 0) {
                for (property in data.announcements) {
                    announcementCount++;
                }
            }
            var photoOption = "";
            if (data.announcements[currentAnnouncement].photo.length > 0) {
                var photoOption = "<p><img src='" + data.announcements[currentAnnouncement].photo + "' alt='" + data.announcements[currentAnnouncement].title + "'>";
            }
            $('#announce').html(
                '<h1>' + data.announcements[currentAnnouncement].title + "</h1>" + "<hr><p>" + data.announcements[currentAnnouncement].message + "</p>" + photoOption
            ).fadeIn();
            if (currentAnnouncement < announcementCount - 1) {
                currentAnnouncement++;
            } else {
                currentAnnouncement = 0;
            }
        });
    })
}
//Execute Announcements
window.setInterval(function() {
    getAnnouncements()
}, announcementInterval);