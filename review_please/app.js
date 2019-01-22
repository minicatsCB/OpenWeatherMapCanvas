const apiKey = "yourApiKey";
const forecastWeatherUrl = "http://api.openweathermap.org/data/2.5/forecast?q=Madrid&units=metric&appid=";

function requestData(url) {
    return fetch(url).then(response => {
        if(response.ok) {
            return response.json().then(data => {
                return Promise.resolve(data);
            });
        } else {
            return Promise.reject(response.status);
        }
    });
}

function requestForecastWeather() {
    let url = forecastWeatherUrl + apiKey;
    requestData(url)
        .then(displayWeather)
        .catch(err => {
            console.error("An error occurred while fetching forecast weather data: ", err);
        });
}

function createChart(nextFiveDaysName, forecastTemperatureData, forecastHumidityData) {
    let ctx = document.getElementById("myChart").getContext("2d");
    let myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: nextFiveDaysName,
            datasets: [{
                label: 'Temperature',
                data: forecastTemperatureData,
                backgroundColor: "transparent",
                borderColor: "red",
                borderWidth: 3
            },
            {
                label: 'Humidity',
                data: forecastHumidityData,
                backgroundColor: "transparent",
                borderColor: "blue",
                borderWidth: 3
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

function displayWeather(data) {
    let nextFiveDaysName = [data.list[0].dt, data.list[8].dt, data.list[16].dt, data.list[24].dt,data.list[32].dt].map(getWeekDayName);
    let forecastTemperatureData = [data.list[0].main.temp, data.list[8].main.temp, data.list[16].main.temp, data.list[24].main.temp, data.list[32].main.temp];
    let forecastHumidityData = [data.list[0].main.humidity, data.list[8].main.humidity, data.list[16].main.humidity, data.list[24].main.humidity, data.list[32].main.humidity];

    createChart(nextFiveDaysName, forecastTemperatureData, forecastHumidityData);
}

function getWeekDayName(timestamp) {
    var date = new Date(timestamp * 1000);
    var options = {
        weekday: 'long'
    };

    return date.toLocaleString("en-EN", options);
}

requestForecastWeather();
