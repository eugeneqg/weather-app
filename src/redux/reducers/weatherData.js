const initialState = {
    data: {
        temp: "",
        feels_like: "",
        humidity: "",
        pressure: "",
        temp_max: "",
        temp_min: ""
    },
    weather: [{
        id: "",
        main: "",
        description: "",
        icon: ""
    }],
    wind: {
        speed: ""
    },
    name: ""
}

const LOAD_WEATHER = "LOAD_WEATHER";
const LOAD_WEATHER_DESCRIPTION = "LOAD_WEATHER_DESCRIPTION";
const LOAD_WIND = "LOAD_WIND";
const LOAD_CITY = "LOAD_CITY";

const weatherReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_WEATHER: 
            return {
                ...state, data: action.payload
            };

        case LOAD_WEATHER_DESCRIPTION:
            return {
                ...state, weather: action.payload
            };

        case LOAD_WIND:
            return {
                ...state, wind: action.payload
            };

        case LOAD_CITY:
            return {
                ...state, name: action.payload
            };

        default:
            return state;
    }
}

export default weatherReducer;
export {LOAD_WEATHER, LOAD_WEATHER_DESCRIPTION, LOAD_WIND, LOAD_CITY};

