$(document).ready(function () {

    var apiKey = "e1014510ebbf942b1f1d07d44fa4f59b";
    // create empty array to store city searches
    var cityList = [];
    var fiveSearch = {};
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
        var queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`;

        // var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=" + apiKey;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (data) {
            console.log(data)
            console.log(data.city.name)
            console.log(data.list[0].weather[0].icon)


            var iconCode = data.list[0].weather[0].icon

            console.log(iconCode)
            var temp = data.list[0].main.temp;
            console.log(temp)
            var humD = data.list[0].main.humidity;
            console.log(humD)
            var windS = data.list[0].wind.speed
            console.log(windS)
            // use city name from api call to render list
            var cityS = data.city.name
            var search = data
            console.log(search)

            //  set current city search result to local storage
            localStorage.setItem("city", cityName + " " + "(" + currentDate + ")");
            localStorage.setItem("cityS", cityS);
            localStorage.setItem("search", JSON.stringify(search))
            localStorage.setItem("icon", iconCode);
            // localStorage.setItem("date", currentDate);
            localStorage.setItem("temp", "Temperature: " + temp + " " + "F");
            localStorage.setItem("humidity", "Humidity: " + humD + " " + "%");
            localStorage.setItem("wind", "Wind Speed: " + windS + " " + "MPH");

            renderCurrentDayForecast();
            // show list of search results on html page  
            renderLastSearchList();

        })

    })
    // render search results on html page  
    renderCurrentDayForecast();

    // render currentr forecast function to display search result on page
    function renderCurrentDayForecast() {
        var city = localStorage.getItem("city");
        var icon = localStorage.getItem("icon");
        // var date = localStorage.getItem("date");
        var temp = localStorage.getItem("temp");
        var hum = localStorage.getItem("humidity");
        var wind = localStorage.getItem("wind");
        // console.log(city)
        if (city) {
            $(".city").text(city);
            // $(".date").text(date);
            // $(".icon").html("<img src='https://openweathermap.org/img/wn/" + icon + ".png" + "'>");
            $(".temp").text(temp);
            $(".humidity").text(hum);
            $(".wind").text(wind);
        }
        // else {
        //     return;
        // }

    }

    // create function to render list of previous searches
    function renderLastSearchList() {
        // get city list from local storage and push to array
        var cityS = localStorage.getItem("cityS")
        cityList.push(cityS)
        console.log(cityList)

        // loop through array using .each() method and append to search form 
        $.each(cityList, function (i, city) {
            $("#city-search").append("<div>" + city + "</div>");


        });
        // use splice method to remove duplications 
        cityList.splice(cityList[0])
    }

    // display five day forecase 
    fiveDayForecast()
    function fiveDayForecast() {
        // use JSON to set and get object with api from localStorage
        var citySearch = JSON.parse(localStorage.getItem("search"))
        console.log(citySearch)
        // use loop to get api search items 
        for (var i = 0; i < citySearch.list.length; i++) {
            console.log(citySearch.list[i])
        }
        // append date to forecasted days
        $(".date1").text(date1);
        $(".date2").text(date2);
        $(".date3").text(date3);
        $(".date4").text(date4);
        $(".date5").text(date5);

        // append icon to forecasted days
        // $(".icon1").html(".icon").html("<img src='https://openweathermap.org/img/wn/" +  citySearch.list[1].weather[0].iconicon + ".png" + "'>");

        // append temperature to forecasted days
        $(".temp1").text(citySearch.city.name);
    }

    // localStorage.getItem("<img src='http://openweathermap.org/img/w/04d.png' alt='Icon depicting current weather.'>")
    // $(".icon").append("<img src='http://openweathermap.org/img/w/04d.png' alt='Icon depicting current weather.'>");



    // localStorage.getItem("<img src='http://openweathermap.org/img/w/04d.png' alt='Icon depicting current weather.'>")
    // $(".icon").append("<img src='http://openweathermap.org/img/w/04d.png' alt='Icon depicting current weather.'>");
})



