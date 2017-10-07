// Get user searches and post them to the itinerary div
function refreshItinerary() {
    console.log("Refreshing itinerary");
     $.ajax({
                type: "GET",
                url: "/api/user",
        }).done(function(response){
                var data = response;
                console.log(data);
                $.ajax({
                    type: "POST",
                    url: "/user/itinerary",
                    data: data,
                }).done(function(response){
                        var itineraryDiv = $("<div>");
                        for (var i = 0; i < response.length; i++) {
                            var countryButton = $("<a>")
                            if ($("#itinerary-div").find(countryButton.attr("id", response[i].id)).length === 0) {
                                countryButton.attr("id", response[i].id);
                                countryButton.text(response[i].itinerary_Item + ", " + response[i].country_Dest);
                                itineraryDiv.append(countryButton);
                                itineraryDiv.append($("<br>"));
                            }
                        }
                        $("#itinerary-div").html(itineraryDiv);
                    });
                });
};

$(document).ready(function () {
    refreshItinerary();
});

// Yelp Search Code Follows
var search = $("#findtext");
var searchButton = $("#search-button");
searchButton.on("click", function () {

    var queryTerms = {
        "data": search.val().trim()
    };
    $('#findtext').val("");
    event.preventDefault();
    $("#new_Modal_1").foundation("open");

    $.ajax({
        type: "POST",
        url: "/api/yelp",
        data: queryTerms,
        success: function (data) {
            var yelps = data;

            var country = yelps[0].location.display_address.pop();
            var name1 = yelps[0].name;
            var name2 = yelps[1].name;
            var name3 = yelps[2].name;
            var name4 = yelps[3].name;
            var name5 = yelps[4].name;

            $(".checkbox1").prop("value", name1);
            $(".checkbox2").prop("value", name2);
            $(".checkbox3").prop("value", name3);
            $(".checkbox4").prop("value", name4);
            $(".checkbox5").prop("value", name5);

            var image1 = $("<img class='yelp-result-image'>");
            var image2 = $("<img class='yelp-result-image'>");
            var image3 = $("<img class='yelp-result-image'>");
            var image4 = $("<img class='yelp-result-image'>");
            var image5 = $("<img class='yelp-result-image'>");

            $("#boxCountry").data("country", country);
            image1.attr("src", yelps[0].image_url);
            image2.attr("src", yelps[1].image_url);
            image3.attr("src", yelps[2].image_url);
            image4.attr("src", yelps[3].image_url);
            image5.attr("src", yelps[4].image_url);

            $("#display1").html(image1);
            $("#display2").html(image2);
            $("#display3").html(image3);
            $("#display4").html(image4);
            $("#display5").html(image5);

            $("#displayname1").text(name1);
            $("#displayname2").text(name2);
            $("#displayname3").text(name3);
            $("#displayname4").text(name4);
            $("#displayname5").text(name5);

            $("#displayaddress1").text(yelps[0].location.display_address);
            $("#displayaddress2").text(yelps[1].location.display_address);
            $("#displayaddress3").text(yelps[2].location.display_address);
            $("#displayaddress4").text(yelps[3].location.display_address);
            $("#displayaddress5").text(yelps[4].location.display_address);
        }
    });
});

// Sending selections back to server



 $("#submit-yelps").on("click" , function () {

        var location1 = $(':input[name="location1"]:checked').val();
        
        var location2 = $(':input[name="location2"]:checked').val();   
        
        var location3 = $(':input[name="location3"]:checked').val(); 
        
        var location4 = $(':input[name="location4"]:checked').val();  
        
        var location5 = $(':input[name="location5"]:checked').val();  

        var country = $('#boxCountry').data("country");

        $('.yelp-selection:input:checked').each(function () {
            console.log(this);
            if ($(this).val()) {
                $('.yelp-selection').prop('checked', false);
            }
        });

        $.ajax(
            {
                type: "GET",
                url: "/api/user",
                success: function(response) {
                    var data = response;
                    console.log(data);
                }
            }).done(function(data){
                var server_data = {};
                    server_data.UID = data.user_id;
                    server_data.Username = data.given_name;
                    server_data.Country = country;
                    server_data.First = location1;
                    server_data.Second = location2;
                    server_data.Third = location3;
                    server_data.Fourth = location4;
                    server_data.Fifth = location5;

                 $.ajax({
                    type: "post",
                    url: "/user/searches/",
                    data: server_data,
                    success: function(result) {
                        refreshItinerary();
                        $("#modal-close-button").click();
                    }
                });
            });
    });

            $("#geolocator").on('click', function() {

                var geocoder = new google.maps.Geocoder;

                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function (position) {
                        var pos = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        };
                        geocoder.geocode({
                            'location': pos
                        }, function (results, status) {
                                    var geo =  $("<div>");
                                    
                                    geo.addClass('geobutton');

                                    geo.html(results[7].formatted_address);

                                    $('#passport-div').append(geo);
                        });
                    });
                };

            });