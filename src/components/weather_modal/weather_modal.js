import "./weather_modal.sass";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import FutureWeatherComponent from "../future_weather/future_weather";

const WeatherModal = ({mainData, futureData}) => {


const getWeather = () => {

    if (mainData.data.temp.length === 0) {
        return (
            <Spinner className="spinner" variant="light"/>
        ) } else {
            
        return (
            <p className="main-weather">{Math.floor(mainData.data.temp)}<sup className="cel"> °C</sup></p>
        )
    }
}

const getIcon = () => {
     if (mainData.weather[0].icon.length === 0) {
        return (
            <Spinner className="spinner" variant="light"/>
        )
     }

     const imgLink = `https://openweathermap.org/img/wn/${mainData.weather[0].icon}@4x.png`

     return (
        <img className="weather-icon" src={imgLink} alt="icon"/>
     )
}

const getWeeklyWeatherCards = () => {

    if (futureData.length !== 7) {
        return (
            <Spinner className="spinner" variant="light"/>
        )
    }

    const cards = futureData.map(e => {
        return (
            <FutureWeatherComponent key={e.date} temp={e.temp} date={e.date} code={e.code}></FutureWeatherComponent>
        )
       })
       return cards;
}

const getMainWeatherBanner = () => {
    if (mainData.name.length !== 0) {
        return (
            <div className="left-col">
                {getIcon()}
                {getWeather()}
                <p className="city">{mainData.name}</p>
            </div>
        )
    } else {
        return (
            <div className="left-col">
                <Spinner className="spinner" variant="light"/>
            </div>
        )
    }
}

const getPressureDescr = () => {
    const pressure = Math.floor(mainData.data.pressure / 1.33);

    if (pressure > 750) {
        return (
            <p className="bl-descr">High. Health issues possible</p>
        )
    } else if (pressure < 750) {
        return (
            <p className="bl-descr">Low. Health issues possible</p>
        )
    }
}

    return (
            <Row>
                <Col className="weather-info">
                    {getMainWeatherBanner()}
                <div className="right-col">
                    <div className="bl">
                        <img src="/img/temp.svg" alt="feels like"/>
                        <div className="bl-text-content">
                            <h3 className="bl-header">Feels like</h3>
                            <p className="bl-text">{Math.floor(mainData.data.feels_like)} <sup>°C</sup></p>
                        </div>
                    </div>
                    <div className="bl">
                        <img src="/img/wind.svg" alt="feels like"/>
                        <div className="bl-text-content">
                            <h3 className="bl-header">Wind</h3>
                            <p className="bl-text">{mainData.wind.speed} <span>km/h</span></p>
                        </div>
                    </div>
                    <div className="bl">
                        <img src="/img/humid.svg" alt="feels like"/>
                        <div className="bl-text-content">
                            <h3 className="bl-header">Humidity</h3>
                            <p className="bl-text">{mainData.data.humidity} %</p>
                        </div>
                    </div>
                    <div className="bl">
                        <img src="/img/pressure.svg" alt="feels like"/>
                        <div className="bl-text-content">
                            <h3 className="bl-header">Pressure</h3>
                            <p className="bl-text">{Math.floor(mainData.data.pressure / 1.33)} <span>mm Hg</span></p>
                        </div>
                        {getPressureDescr()}
                    </div>
                </div>
                <div className="bottom">
                    {getWeeklyWeatherCards()}
                </div>
                </Col>
            </Row>
    )
}

export default WeatherModal;

