let spanElement = document.querySelector(".footer2 span");
let footerElement = document.querySelector(".footer2");

let content = spanElement.innerText;
footerElement.removeChild(spanElement);

//alert(newElement);
for (let i = 0; i < content.length; i++) {
    let newElement = document.createElement("span");
    footerElement.appendChild(newElement);
    newElement.append(content[i]);
}
footerElement = document.querySelectorAll(".footer2 span");
for (i = 0; i < footerElement.length; i++) {
    footerElement[i].style.color = getRGBString();

}


function getRGBString() {
    let colorr = Math.trunc(Math.random() * 222);
    let colorg = Math.trunc(Math.random() * 222);
    let colorb = Math.trunc(Math.random() * 222);

    return `rgb(${colorr},${colorg},${colorb})`;
}

$.ajax({
    type: 'GET',
    //url: 'https://api.open-meteo.com/v1/forecast?latitude=45.51&longitude=-73.59&hourly=temperature_2m&current_weather=true',
    url: 'https://api.open-meteo.com/v1/forecast?latitude=45.51&longitude=-73.59&daily=precipitation_sum&timezone=America/Toronto&current_weather=true',


    error: function () {
        alert(' error network ');
    },
    success: function (res) {
        console.dir(res);
        console.log(res.daily.precipitation_sum);
        let precipitation_sum_value = 0;
        for (let i = 0; i < res.daily.precipitation_sum.length; i++) { precipitation_sum_value = res.daily.precipitation_sum[0] + precipitation_sum_value; }
        console.log(res.current_weather);
        console.log(res.current_weather.temperature);
        console.log(res.current_weather.windspeed);

        document.querySelector("#precipitation_value").innerText = precipitation_sum_value.toFixed(2);
        document.querySelector("#temperature_value").innerText = res.current_weather.temperature;
        //document.querySelector("#humidity_value").innerText);
        document.querySelector("#wind_value").innerText = res.current_weather.windspeed;

    }
});
