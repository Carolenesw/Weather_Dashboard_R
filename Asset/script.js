$(document).ready(function () {

    var apiKey = "e1014510ebbf942b1f1d07d44fa4f59b";
    var cityName =  $(".search");
    // var queryURL = `https://api.openweathermap.org/data/2.5/forecast?q={cityName}&appid={apiKey}`;

    var queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName},Jamaica&appid=${apiKey}`;

   
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (data) {
        console.log(data)

        $(".save").on("click", function (event) {
            event.preventDefault();
            cityName = cityName.val();
            console.log(cityName)
        })
    })
})



