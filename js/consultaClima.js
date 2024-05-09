const apiKey = '2630dfb88098a5460aed8d2fe1e6d745';
const city = 'Punta Arenas';

const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=es`;

async function getWeatherForecast() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener datos meteorológicos:', error);
        return null;
    }
}

async function showWeatherForecast() {
    const weatherData = await getWeatherForecast();

    if (weatherData && weatherData.list) {
        const weatherCardsContainer = document.getElementById('weather-cards');

        // Obtener datos de los próximos 8 días
        const dailyWeather = [];
        const processedDates = {}; // Para evitar duplicados
        let daysCount = 0;

        weatherData.list.forEach(item => {
            const date = new Date(item.dt_txt);
            const dateString = date.toDateString();
            if (!processedDates[dateString] && daysCount < 8) {
                dailyWeather.push(item);
                processedDates[dateString] = true;
                daysCount++;
            }
        });

        console.log("Número de días obtenidos:", dailyWeather.length); // Registro para verificar el número de días obtenidos
        console.log("Datos completos de los días:", dailyWeather); // Registro para ver los datos obtenidos

        // Crear tarjetas para cada día
        dailyWeather.forEach(dayData => {
            const card = createWeatherCard(dayData);
            weatherCardsContainer.appendChild(card);
        });
    } else {
        console.error('No se pudo obtener la información del clima.');
    }
}



function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function createWeatherCard(data) {
    const card = document.createElement('div');
    card.classList.add('card');

    const temperature = Math.round(data.main.temp);
    const date = new Date(data.dt_txt);
    const dayOfWeek = capitalizeFirstLetter(new Intl.DateTimeFormat('es', { weekday: 'long' }).format(date));
    const dayOfMonth = date.getDate();
    const month = capitalizeFirstLetter(new Intl.DateTimeFormat('es', { month: 'long' }).format(date));

    card.innerHTML = `
        <h2>${temperature}°C</h2>
        <h4>${dayOfWeek}</h4>
        <h4>${dayOfMonth}</h4>
        <h3> ${month}</h3>
    `;

    return card;
}


showWeatherForecast();
