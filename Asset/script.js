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
            console.log(data)
            
            // use variables to stored api call criterias
            var iconCode = data.list[0].weather[0].icon
            var temp = data.list[0].main.temp;
            var humD = data.list[0].main.humidity;
            console.log(humD)
            var windS = data.list[0].wind.speed
            // use city name from api call to render list
            var cityS = data.city.name
            var search = data

            //  set current city search result to local storage
            localStorage.setItem("city", cityName + " " + "(" + currentDate + ")");
            localStorage.setItem("cityS", cityS);
            localStorage.setItem("search", JSON.stringify(search))
            localStorage.setItem("icon", iconCode);
            // localStorage.setItem("date", currentDate);
            localStorage.setItem("temp", "Temperature: " + temp + " " + "F");
            localStorage.setItem("humidity", "Humidity: " + humD + " " + "%");
            localStorage.setItem("wind", "Wind Speed: " + windS + " " + "MPH");

            renderCurrentDayForecast(cityName);
            // show list of search results on html page  
            renderLastSearchList();
            fiveDayForecast();
        })

    })
    // render search results on html page  
    renderCurrentDayForecast();

    // render currentr forecast function to display search result on page
    function renderCurrentDayForecast(cityName) {
        var city = localStorage.getItem("city");
        var icon = localStorage.getItem("icon");
        // var date = localStorage.getItem("date");
        var temp = localStorage.getItem("temp");
        var hum = localStorage.getItem("humidity");
        var wind = localStorage.getItem("wind");
        //    rendering city search on page
        if (city) {
            $(".city").text(city);
            $(".icon").html("<img src='https://openweathermap.org/img/wn/" + icon + ".png" + "'>");
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


            $(".save").on("click", function (event) {
                event.preventDefault();

                // var click = $(this).parent().attr("id");
                // $("#city-search").children()
                // ("#city-search").children("<div>")
                // $("#city-search").find()
                // var click = $(this).parent().children();

                // var click = $(this).parent().parent().find("<di>");
            })

        });
        // use splice method to remove duplications 
        cityList.splice(cityList[0])
    }

    // display five day forecase 
    // fiveDayForecast()
    function fiveDayForecast() {

        // append date to forecasted days
        $(".date1").text(date1);
        $(".date2").text(date2);
        $(".date3").text(date3);
        $(".date4").text(date4);
        $(".date5").text(date5);


        // use JSON to set and get object with api from localStorage
        var citySearch = JSON.parse(localStorage.getItem("search"))
        console.log(citySearch)
        // use loop to get api search items 
        for (var i = 0; i < citySearch.list.length; i++) {
            console.log(citySearch.list[i].weather[0].icon)
            
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
            
        }
        
    }

})



