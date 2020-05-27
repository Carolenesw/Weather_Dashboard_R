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

        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=" + apiKey;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (data) {
            console.log(data)
            console.log(data.city.name)
            console.log(data.list[0].weather[0].icon)


            // $(".icon").html("<img src='http://openweathermap.org/img/w/" + data.list[0].weather[0].icon + ".png' alt='Icon depicting current weather.'>");

            // use variables to capture required data from API call
            var iconCode = "<img src='http://openweathermap.org/img/w/" + data.list[0].weather[0].icon + ".png' alt='Icon depicting current weather.'>";
            console.log(iconCode)

            var currentDate = data.list[0].dt_txt;
            console.log(currentDate)

            var temp = data.list[0].main.temp;
            console.log(temp)
            var humD = data.list[0].main.humidity;
            console.log(humD)
            var windS = data.list[0].wind.speed
            console.log(windS)



            //  set city search result to local storage
            localStorage.setItem("city", cityName)
            localStorage.setItem("icon", iconCode)

        })
    })

    // localStorage.getItem("<img src='http://openweathermap.org/img/w/04d.png' alt='Icon depicting current weather.'>")
    // $(".icon").append("<img src='http://openweathermap.org/img/w/04d.png' alt='Icon depicting current weather.'>");



    // localStorage.getItem("<img src='http://openweathermap.org/img/w/04d.png' alt='Icon depicting current weather.'>")
    // $(".icon").append("<img src='http://openweathermap.org/img/w/04d.png' alt='Icon depicting current weather.'>");
})



