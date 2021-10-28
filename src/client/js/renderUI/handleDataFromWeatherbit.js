export function handleDataFromWeatherbit(dataFromWeatherbit, dateTravel, daysRemain) {
    if (!dataFromWeatherbit) return;
    const cityName = dataFromWeatherbit.city_name;
    const dataWeather = dataFromWeatherbit['data'];
    const highTemp = dataWeather[dataWeather.length - 1].max_temp;
    const lowTemp = dataWeather[dataWeather.length - 1].low_temp;
    const dateTime = dateTravel;
    const timeTravel = new Date(dateTime).toDateString();
    let timeRemain;
    if (daysRemain > 1) {
        timeRemain = `You have ${daysRemain} days to departure.`;
    } else if (daysRemain > 0) {
        timeRemain = `You have ${daysRemain} day to departure.`;
    } else {
        timeRemain = 'Departure today.';
    }

    return {cityName, highTemp, lowTemp, timeTravel, timeRemain}
}