$(document).ready(function () {

    var apiKey = "e1014510ebbf942b1f1d07d44fa4f59b";
    var cityList = "";

    // create empty array to store city searches
    var cityList = [];
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

        if (!cityName) {
            alert("Please enter a City Name!")
        }
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


            // $(".icon").html("<img src='http://openweathermap.org/img/w/" + data.list[0].weather[0].icon + ".png' alt=''>");

            // use variables to capture required data from API call
            // var iconCode = "<img src='http://openweathermap.org/img/w/" + data.list[0].weather[0].icon + ".png' alt='Icon depicting current weather.'>";
            var iconCode = $(".icon").html("<img src='http://openweathermap.org/img/w/" + data.list[0].weather[0].icon + ".png' alt=''>");
            // var iconCode = "<img src=http://openweathermap.org/img/wn/" + data.list[0].weather[0].icon + ".png"+ ">";
            console.log(iconCode)
            var temp = data.list[0].main.temp;
            console.log(temp)
            var humD = data.list[0].main.humidity;
            console.log(humD)
            var windS = data.list[0].wind.speed
            console.log(windS)
            // use city name from api call to render list
            var cityS = data.city.name

            //  set current city search result to local storage
            localStorage.setItem("city", cityName + " " + "(" + currentDate + ")");
            localStorage.setItem("cityS", cityS);
            localStorage.setItem("icon", JSON.stringify(iconCode));
            localStorage.setItem("date", currentDate);
            localStorage.setItem("temp", "Temperature: " + temp + "F");
            localStorage.setItem("humidity", "Humidity: " + humD + "%");
            localStorage.setItem("wind", "Wind Speed: " + windS + "MPH");

            renderLastSearch();
        })

    })


    // render currentr forecast function to display search result on page
    renderCurrentDayForecast();
    function renderCurrentDayForecast() {
        var city = localStorage.getItem("city");
        var icon = JSON.parse(localStorage.getItem("icon"));
        var date = localStorage.getItem("date");
        // console.log(date)
        var temp = localStorage.getItem("temp");
        var hum = localStorage.getItem("humidity");
        var wind = localStorage.getItem("wind");
        // console.log(city)
        if (city) {
            $(".city").text(city);
            $(".date").text(date);
            $(".icon").text(icon);
            $(".temp").text(temp);
            $(".humidity").text(hum);
            $(".wind").text(wind);
        }
        // else {
        //     return;
        // }

    }

    // create function to render list of previous searches
    function renderLastSearch() {
        // get city list from local storage and push to array
        var cityS = localStorage.getItem("cityS")
        console.log(cityS)
        cityList.push(cityS)
        console.log(cityList)
        
    }


    // localStorage.getItem("<img src='http://openweathermap.org/img/w/04d.png' alt='Icon depicting current weather.'>")
    // $(".icon").append("<img src='http://openweathermap.org/img/w/04d.png' alt='Icon depicting current weather.'>");



    // localStorage.getItem("<img src='http://openweathermap.org/img/w/04d.png' alt='Icon depicting current weather.'>")
    // $(".icon").append("<img src='http://openweathermap.org/img/w/04d.png' alt='Icon depicting current weather.'>");
})



