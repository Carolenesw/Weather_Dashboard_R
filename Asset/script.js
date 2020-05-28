$(document).ready(function () {

    var apiKey = "e1014510ebbf942b1f1d07d44fa4f59b";
    var cityName = "";

     // use to moment.js to add and change dates
     var currentDate = moment().format('L');
     var date1 = moment().add(1, 'days').format('L'); 
     var date2 = moment().add(2, 'days').format('L')
     var date3 = moment().add(3, 'days').format('L')
     var date4 = moment().add(4, 'days').format('L')
     var date5 = moment().add(5, 'days').format('L')
     console.log(date5)
     console.log(currentDate)

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
            var temp = data.list[0].main.temp;
            console.log(temp)
            var humD = data.list[0].main.humidity;
            console.log(humD)
            var windS = data.list[0].wind.speed
            console.log(windS)

            //  set current city search result to local storage
            localStorage.setItem("city", cityName);
            localStorage.setItem("icon", iconCode);
            localStorage.setItem("date", currentDate);
            localStorage.setItem("temp", "Temperature: " + temp + "F");
            localStorage.setItem("humidity", "Humidity: " + humD + "%");
            localStorage.setItem("wind", "Wind Speed: " + windS + "MPH");

        })
    })

    // localStorage.getItem("<img src='http://openweathermap.org/img/w/04d.png' alt='Icon depicting current weather.'>")
    // $(".icon").append("<img src='http://openweathermap.org/img/w/04d.png' alt='Icon depicting current weather.'>");



    // localStorage.getItem("<img src='http://openweathermap.org/img/w/04d.png' alt='Icon depicting current weather.'>")
    // $(".icon").append("<img src='http://openweathermap.org/img/w/04d.png' alt='Icon depicting current weather.'>");
})



