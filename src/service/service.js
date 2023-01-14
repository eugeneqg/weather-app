const weatherService = {

    getCoords: async (city) => {

        console.log(city)

        if (city === "") {

            const res = await fetch(`https://ip-api.com/json/`);

            if (!res.ok) {
                throw new Error(`Couldn't fetch location`)
            }
    
            return await res.json()

        } else {
            const res = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=cc9bd7b27324369a7212f78944e8937f`);

            if (!res.ok) {
                throw new Error(`Couldn't fetch location`)
            }
    
            return await res.json().then(data => data[0])
        }

    },
    
    getNewWeather: async (lat, lon) => {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=cc9bd7b27324369a7212f78944e8937f`);

        if (!res.ok) {
            throw new Error(`Couldn't load weather by coords`);
        }

        return await res.json();
    },

    getWeeklyData: async (lat, lon, from, to) => {
        const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,weathercode&timezone=auto&start_date=${from}&end_date=${to}`);

        if (!res.ok) {
            throw new Error(`Couldn't load weekly data`)
        }

        return await res.json(); 
    }
}

export default weatherService;
