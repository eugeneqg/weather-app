import './App.sass';
import React, {useEffect, useState} from 'react';
import Container from "react-bootstrap/Container";
import weatherService from '../service/service';
import Header from '../components/header/header';
import WeatherModal from '../components/weather_modal/weather_modal';
import { useSelector, useDispatch } from 'react-redux';
import { LOAD_WEATHER, LOAD_WEATHER_DESCRIPTION, LOAD_WIND, LOAD_CITY } from '../redux/reducers/weatherData';
import { GET_WEEKLY_FORECAST } from '../redux/reducers/weeklyWeather';

function App() {

  const weatherData = useSelector(state => state.weather);
  const weeklyForecastData = useSelector(state => state.weekly.data);

  const [coords, setCoords] = useState({lat: "", lon: ""}),
        [city, setCity] = useState("");

  const dispatch = useDispatch();

  const getFromToDates = () => {
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    let finish = new Date();
    finish.setDate(tomorrow.getDate() + 6);

    let dates = {
      from: tomorrow.toISOString().slice(0, 10),
      to: finish.toISOString().slice(0, 10)
    }

    return dates;
  }

  const dateFrom = getFromToDates();

  useEffect(() => {

    weatherService.getCoords(city)
    .then(data =>  {
          setCoords({
            lat: data.lat,
            lon: data.lon
          })

      weatherService.getNewWeather(coords.lat, coords.lon)
        .then(data => {
          dispatch({type: LOAD_WEATHER, payload: data.main});
          dispatch({type: LOAD_WEATHER_DESCRIPTION, payload: data.weather});
          dispatch({type: LOAD_WIND, payload: data.wind});
          dispatch({type: LOAD_CITY, payload: data.name});
          });

      weatherService.getWeeklyData(+coords.lat, +coords.lon, dateFrom.from, dateFrom.to)
        .then(data => {

          const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

          const today = new Date().getDay();
        
          const removedDates = weekDays.splice(0, today + 1);
          const updatedArr = [...weekDays , ...removedDates]
          const tempD = data.daily.temperature_2m_max,
                weatherCode = data.daily.weathercode;

          let arrObjData = [];
          for (let i = 0; i < 7; i++) {
                arrObjData.push({temp: tempD[i], date: updatedArr[i], code: weatherCode[i]})
          }
          dispatch({type: GET_WEEKLY_FORECAST, payload: arrObjData});

        })
        .catch(error => console.error("error"));
    }).catch(error => console.error("error"));

    // eslint-disable-next-line
  }, [city, coords.lat, coords.lon]);


  const getBackground = (weather) => {
    
    if (weather < 0) {
      return "/img/cold.png";
    } else if (weather > 0 && weather < 10) {
      return "/img/warm.png";
    } else if (weather > 9 ) {
      return "/img/hot.png";
    } else {
      return
    }

  }

  const backImage = {
    backgroundImage: `url(${getBackground(weatherData.data.temp)})`,
    position: "fixed",
    backgroundSize: "cover",
    width: "100%",
    height: "100%",
    overflow: "scroll",
    top: "0",
    left: "0"
  }

  return (
    <div className="App" style={backImage}>
      <Header className="header" setCity={setCity}/>
      <Container className='container-style'>
        <WeatherModal mainData={weatherData} futureData={weeklyForecastData}/>
      </Container>

    </div>
  );
}

export default App;
