import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState("");
  const [moreDetail, setMoreDetail] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://api.weatherapi.com/v1/forecast.json?key=${
            import.meta.env.VITE_WEATHER_API
          }&q=${location}&days=4&aqi=yes&alerts=yes`
        );
        setWeatherData(response.data);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    if (location) {
      fetchData();
    }
  }, [location]);
  const getLocationInput = (e) => {
    e.preventDefault();
    const buttonElement = e.target;
    const divElement = buttonElement.parentNode;
    const inputElement = divElement.querySelector("input");
    setLocation(inputElement.value);
  };
  const toggleMoreDetail = () => {
    // Toggle the value of moreDetail
    setMoreDetail(!moreDetail);
  };

  return (
    <>
      <div className="container mt-5">
        <h1 className="display-4 text-center">Weather App</h1>
        <div className="row justify-content-center mt-4">
          <div className="col-6">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter City Name"
                value={location}
                onChange={getLocationInput}
              />
              <button
                className="btn btn-primary"
                onClick={getLocationInput}
                type="button"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
        {weatherData && (
          <div className="row mt-3">
            <h2 className="text-center mb-3">
              {!location ? "" : `City of ${location.toUpperCase()}`}
            </h2>
            {location && (
              <>
                {weatherData.forecast.forecastday.map((day) => (
                  <div className="col-md-4" key={day.date}>
                    <div className="card mb-3">
                      <div className="card-body text-center">
                        <h2 className="card-title">{day.date}</h2>
                        <img
                          src={day.day.condition.icon}
                          alt={day.day.condition.icon}
                          className="img-fluid"
                        />
                        <h5 className="card-text mb-3">
                          {day.day.condition.text}
                        </h5>
                        <p className="card-text">
                          {day.day.avgtemp_c} C / {day.day.avgtemp_f} F
                        </p>
                        {moreDetail && (
                          <>
                            <hr />
                            <p className="card-text">
                              Min Temp: {day.day.mintemp_c} C /{" "}
                              {day.day.mintemp_f} F
                            </p>
                            <hr />
                            <p className="card-text">
                              Max Temp: {day.day.maxtemp_c} C /{" "}
                              {day.day.maxtemp_f} F
                            </p>
                            <hr />
                            <p className="card-text">
                              Average Wind Speed: {day.day.avgvis_km} km /{" "}
                              {day.day.avgvis_miles} ml
                            </p>
                            <hr />
                            <p className="card-text">
                              Average Humidity: {day.day.avghumidity}%
                            </p>
                            <hr />
                            <p className="card-text">
                              Daily Chance of Rain:{" "}
                              {day.day.daily_chance_of_rain}%
                            </p>
                            <hr />
                            <p className="card-text">
                              Daily Chance of Snow:{" "}
                              {day.day.daily_chance_of_snow}%
                            </p>
                          </>
                        )}

                        <button
                          className="btn btn-primary"
                          type="button"
                          onClick={toggleMoreDetail}
                        >
                          {moreDetail ? "Less details" : "More details"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
