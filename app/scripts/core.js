//global variables
var currentAnnouncement = 0;
var announcementCount = 0;


//Get announcements
function getAnnouncements() {
    $.getJSON(announcementSource, function(data) {
        $('#announce').fadeOut(function() {
            if (announcementCount === 0) {
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
    });
}
//Execute Announcements
window.setInterval(function() {
    getAnnouncements();
}, announcementInterval);