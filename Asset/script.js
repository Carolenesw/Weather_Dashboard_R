$(document).ready(function () {

    var apiKey = "e1014510ebbf942b1f1d07d44fa4f59b";
    var cityName = "";

    // click function to capture city search and call weather app API
    $(".save").on("click", function (event) {
        event.preventDefault();
        cityName = $(".search").val().trim();
        console.log(cityName)

        // AJAX call to the run OpenWeatherMap API for 5 days forecast
        // var queryURL = `https://api.openweathermap.org/data/2.5/forecast?q={cityName}&appid={apiKey}`;

        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=e03d5c93b258a3dd162f1dc56d7449bd";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (data) {
            console.log(data)


        })
    })
})



