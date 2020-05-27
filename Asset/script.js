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
            console.log(data.city.name)
            console.log(data.list[0].weather[0].icon)


            
            console.log(iconCode)

            var iconUrl = "http://openweathermap.org/img/wn/" + iconCode;

            // http://openweathermap.org/img/wn/10d@2x.png
            console.log(iconUrl)
            // $(".icon").html("<img src='" + iconUrl  + "'>");
           

            var iconCode = "<img src='http://openweathermap.org/img/w/" + data.list[0].weather[0].icon + ".png' alt='Icon depicting current weather.'>";
            console.log(iconCode)
            //  set city search result to local storage
            localStorage.setItem("city", cityName)
            localStorage.setItem("icon", iconCode)

        })
    })
    
    localStorage.getItem("<img src='http://openweathermap.org/img/w/04d.png' alt='Icon depicting current weather.'>")
    $(".icon").append("<img src='http://openweathermap.org/img/w/04d.png' alt='Icon depicting current weather.'>");
})



