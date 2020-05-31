$(document).ready(function () {

    var apiKey = "e1014510ebbf942b1f1d07d44fa4f59b";
    // create empty array to store city searches
    var cityList = [];
    // use to moment.js to add and change dates
    var currentDate = moment().format('L');
    var date1 = moment().add(1, 'days').format('L');
    var date2 = moment().add(2, 'days').format('L')
    var date3 = moment().add(3, 'days').format('L')
    var date4 = moment().add(4, 'days').format('L')
    var date5 = moment().add(5, 'days').format('L')

    // click function to capture city search and call weather app API
    $(".save").on("click", function (event) {
        event.preventDefault();
        cityName = $(".search").val().trim();

        if (!cityName) {
            alert("Please enter a City Name!")
        }

        // AJAX call to the run OpenWeatherMap API for 5 days forecast
        var queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=${apiKey}`;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (data) {
            // console.log(data)

            // use variables to stored api call criterias
            var iconCode = data.list[0].weather[0].icon
            var temp = data.list[0].main.temp;
            var humD = data.list[0].main.humidity;
            var windS = data.list[0].wind.speed
            // use city name from api call to render list
            var cityS = data.city.name
            var search = data
            // collect data for uv index
            var lat = data.city.coord.lat
            var lon = data.city.coord.lon

            //  set current city search result to local storage
            localStorage.setItem("city", cityName + " " + "(" + currentDate + ")");
            localStorage.setItem("cityS", cityS);
            localStorage.setItem("search", JSON.stringify(search))
            localStorage.setItem("icon", iconCode);
            localStorage.setItem("temp", "Temperature: " + temp + " " + "F");
            localStorage.setItem("humidity", "Humidity: " + humD + " " + "%");
            localStorage.setItem("wind", "Wind Speed: " + windS + " " + "MPH");
            localStorage.setItem("lat", lat);
            localStorage.setItem("lon", lon);

            // render search results on html page 
            renderCurrentDayForecast();
            renderLastSearchList();
            fiveDayForecast();
        })

    })

    renderCurrentDayForecast();
    // render currentr forecast function to display search result on page
    function renderCurrentDayForecast(cityName) {
        var city = localStorage.getItem("city");
        var icon = localStorage.getItem("icon");
        var temp = localStorage.getItem("temp");
        var hum = localStorage.getItem("humidity");
        var wind = localStorage.getItem("wind");
        console.log(icon)
        //    rendering city search on page
        if (city) {
            $(".city").text(city);
            $(".icon").html("<img src='https://openweathermap.org/img/wn/" + icon + ".png" + "'>");
            $(".temp").text(temp);
            $(".humidity").text(hum);
            $(".wind").text(wind);
        }

        // add color code the highlight weather conditions
        if (icon === '01d' || icon === '02d' || icon === '01n' || icon === '02n') {
            $(".city").css({ "background-color": "#77dd77" });
        } else if (icon === '03d' || icon === '03n' || icon === '04d' || icon === '04n') {
            $(".city").css({ "background-color": "#FFBF00" });
        } else {
            $(".city").css({ "background-color": "#ff6961" });
        }

    }

    // create function to render list of previous searches
    function renderLastSearchList() {
        // get city list from local storage and push to array
        var cityS = localStorage.getItem("cityS");
        cityList.push(cityS);
        // console.log(cityList)

        // loop through array using .each() method and append to search form 
        $.each(cityList, function (i, city) {
            // $("#city-search").append("<br><button>");
            var button = $("<br><button>")
            button.addClass("cities")
            button.text(city).val(city)
            $("#city-search").append(button)

            console.log(button)
            // $("#city-search").append("button").addClass("cities").text(city);

        });
        // use splice method to remove duplications 
        cityList.splice(cityList[0]);

        $(".cities").on("click", function (event) {
            event.preventDefault();

            var city = $(this).val().trim();
            // var cityN = $(".cityN")

            if (city) {
                // $(".city").empty(city)

            }

            console.log(city)
            // renderCurrentDayForecast();
            fiveDayForecast();

        })
    }

    // display five day forecase 
    fiveDayForecast()
    function fiveDayForecast() {

        // append date to forecasted days
        $(".date1").text(date1);
        $(".date2").text(date2);
        $(".date3").text(date3);
        $(".date4").text(date4);
        $(".date5").text(date5);

        // use JSON to set and get object with api from localStorage
        var citySearch = JSON.parse(localStorage.getItem("search"));

        // use loop to get api search items 
        for (var i = 0; i < citySearch.list.length; i++) {

            // append weather icons 
            $(".icon1").html(".icon1").html("<img src='https://openweathermap.org/img/wn/" + citySearch.list[1].weather[0].icon + ".png" + "'>");
            $(".icon2").html(".icon2").html("<img src='https://openweathermap.org/img/wn/" + citySearch.list[2].weather[0].icon + ".png" + "'>");
            $(".icon3").html(".icon3").html("<img src='https://openweathermap.org/img/wn/" + citySearch.list[3].weather[0].icon + ".png" + "'>");
            $(".icon4").html(".icon4").html("<img src='https://openweathermap.org/img/wn/" + citySearch.list[4].weather[0].icon + ".png" + "'>");
            $(".icon5").html(".icon5").html("<img src='https://openweathermap.org/img/wn/" + citySearch.list[5].weather[0].icon + ".png" + "'>");

            // append temperature data
            $(".temp1").text("Temp: " + citySearch.list[1].main.temp + " " + "F");
            $(".temp2").text("Temp: " + citySearch.list[2].main.temp + " " + "F");
            $(".temp3").text("Temp: " + citySearch.list[3].main.temp + " " + "F");
            $(".temp4").text("Temp: " + citySearch.list[4].main.temp + " " + "F");
            $(".temp5").text("Temp: " + citySearch.list[5].main.temp + " " + "F");

            // append humidity data
            $(".humidity1").text("Humidity: " + citySearch.list[1].main.humidity + " " + "%");
            $(".humidity2").text("Humidity: " + citySearch.list[2].main.humidity + " " + "%");
            $(".humidity3").text("Humidity: " + citySearch.list[3].main.humidity + " " + "%");
            $(".humidity4").text("Humidity: " + citySearch.list[4].main.humidity + " " + "%");
            $(".humidity5").text("Humidity: " + citySearch.list[5].main.humidity + " " + "%");

        };

    };

    // api call for UV Index... get lon and lat from weather forecast api
    var lat = localStorage.getItem("lat");
    var lon = localStorage.getItem("lon");

    var apiKey1 = "351b80106cd356a907301219dd0c7806";
    var queryURL1 = `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey1}&lat=${lat}&lon=${lon}`;

    $.ajax({
        url: queryURL1,
        method: "GET",
    }).then(function (res) {
        console.log(res)
        // get and a ppend uv index from local storage
        var uvI = res.value;
        $(".UV").text("UV Index: " + uvI);

    });

});



