import "./future_weather.sass";

const FutureWeatherComponent = ({temp, date, code}) => {

    const getWeatherIcon = (code) => {
        switch (true) {
            case code < 4:
                return "01d@4x.png";
            case code > 29 && code < 40:
                return "09d@4x.png";
            case code > 39 && code < 50:
                return "50d@4x.png";
            case code > 49 && code < 70:
                return "10d@4x.png";
            case code > 69 && code < 80:
                return "13d@4x.png";
            case code > 79 && code < 90:
                return "11d@4x.png";
            default:
                return
        }
    }
    
    const iconCode = getWeatherIcon(code);

    const imgLink = `https://openweathermap.org/img/wn/${iconCode}`

    return (

        <div className="wt-bl">
            <img src={imgLink} alt="img"/>
            <p className="weekday">{date}</p>
            <p className="small-weather">{Math.floor(temp)}<sup className="small-cel"> °C</sup></p>
        </div>

    )

}

export default FutureWeatherComponent;
