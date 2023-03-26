
let cors = require("cors");

async function get_weather(zip){
    try{
    data_pre = await fetch(`http://api.weatherapi.com/v1/current.json?key=012738ce161c46da8df153648232603&q=${zip}&aqi=no`, {mode:'cors'})
    data = await data_pre.json()
    console.log(data.location.name)
    }catch (error){
        console.log("Error:", error)
    }

}

get_weather("07871")