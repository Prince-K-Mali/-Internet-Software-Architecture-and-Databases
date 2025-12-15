
let city = document.querySelector('.name');// Selecting the HTML element that displays the city name
let form = document.querySelector("form");// Selecting the form element to handle form submission
let temperature = document.querySelector('.temperature');
// Selecting the HTML element that displays the temperature
let description = document.querySelector('.description');// simply it means displaying weather description 
let valueSearch = document.getElementById('name');// user enter city names 
let clouds = document.getElementById('clouds');
let humidity = document.getElementById('humidity');
let pressure = document.getElementById('pressure');
// Update the date and time elements on the page
let date =document.getElementById('date');
let time = document.getElementById('time');
let main = document.querySelector('main');// it display weather  data  or error 
let id = '71ad329563cf71c086a818b9a40fec26';// storing API Key for openingweather map 
let url = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid=' + id;// for open weathermap using matric units 


form.addEventListener("submit", (e) => {
    e.preventDefault();  
    if(valueSearch.value != ''){ // check if the input isnot iput 
        searchWeather(); //caling  the function and display the weather data 
    }
});
const searchWeather = () => {
    fetch(url+'&q='+ valueSearch.value)// Appends the city name to the API URL
        .then(response => response.json()) // Converts the API response to JSON
        .then(data => {
            console.log(data);// Logs the API response for debugging purposes
            if(data.cod == 200){ // Checks if the API response is successful
                // update city name and county flag 
                city.querySelector('figcaption').innerHTML = data.name;
                city.querySelector('img').src = `https://flagsapi.com/${data.sys.country}/shiny/32.png`;
                // Updates the temperature and weather icon
                temperature.querySelector('img').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
                temperature.querySelector('span').innerText = data.main.temp;
                // Updates the weather description
                description.innerText = data.weather[0].description;

                clouds.innerText = data.clouds.all;
                humidity.innerText = data.main.humidity;
                pressure.innerText = data.main.pressure;
            }else{
                main.classList.add('error');
                setTimeout(() => {
                    main.classList.remove('error');
                }, 1000);
            }
            valueSearch.value = '';
        })
}
const updateDateTime = () => { // Function to update the current date and time on the page
    const now = new Date();
    const date = now.toLocaleDateString(undefined, { // Format the date (e.g., "Monday, January 1, 2024")

        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    const time = now.toLocaleTimeString(undefined, { // Format the time (e.g., "12:34:56 PM")
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });

    document.getElementById('date').innerText = date;
    document.getElementById('time').innerText = time;
};

// Update the date and time every second   // Run the function every second to keep the time updated
setInterval(updateDateTime, 1000);

// Call once initially to set the date and time on load
updateDateTime();

// search Default city 
const initApp = () => {
    valueSearch.value = 'Birmingham';// Sets the default city to "Birmingham"
    searchWeather();// Calls the function to fetch and display weather data for the default city

}
initApp();


