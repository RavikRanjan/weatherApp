import React, { useEffect, useState } from "react";
import axios from "axios";
import Clock from "react-live-clock";

export default function Home() {
  const [inputCity, setInputCity] = useState("");
  const [data, setData] = useState({});
  const apiKey = "f56f24967aaf51182d1d4df628297c6d";

  const getWetherDetails = (cityName) => {
    if (!cityName) return;
    const apiURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityName +
      "&appid=" +
      apiKey;
    axios
      .get(apiURL)
      .then((res) => {
        console.log("response", res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const handleChangeInput = (e) => {
    setInputCity(e.target.value);
  };

  const handleSearch = () => {
    getWetherDetails(inputCity);
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`;
  };

  useEffect(() => {
    getWetherDetails("delhi");
  }, []);

  return (
    <>
      {Object.keys(data).length > 0 && (
        <div className="background">
          <div className="container-fluid position-relative">
            <div>
              <h1 className="text-center mt-2">Weather App</h1>
            </div>
            <div className="content">
              <h1>
                <i class="bi bi-geo-alt"></i> Delhi, IN
              </h1>
              <h2>
                <Clock format="HH:mm:ss" interval={1000} ticking={true} />
              </h2>
              <h3>{dateBuilder(new Date())}</h3>
            </div>
            <div className="background1">
              <img
                src="assets/images/weatherIcon2.gif"
                className="img-fluid"
                alt="no gif pic"
              />
              <div className="data">
                <h2 className="text-center" style={{ fontWeight: "bold" }}>
                  {data.weather[0].main}
                </h2>

                <div className="form mt-4 w-100">
                  <form action="">
                    <input
                      type="search"
                      name="search"
                      id="search"
                      placeholder="Enter City Name"
                      style={{ width: "80%" }}
                      value={inputCity}
                      onChange={handleChangeInput}
                    />
                    <button type="button">
                      <i class="bi bi-search" onClick={handleSearch}></i>
                    </button>
                  </form>
                </div>
                <h3
                  className="mt-3 pb-4 country"
                  style={{ borderBottom: "2px solid white" }}
                >
                  <i class="bi bi-geo-alt"></i> {data?.name},{" "}
                  {data.sys.country}{" "}
                  <img
                    src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
                    alt=""
                    style={{
                      position: "inherit",
                      backgroundColor: "#b5fdb5",
                      height: "40px",
                      borderRadius: "50%",
                    }}
                  />
                </h3>
                <div
                  className="d-flex justify-content-between p-2"
                  style={{ borderBottom: "2px solid white" }}
                >
                  <p>Temperature </p>
                  <p>{(data.main.temp - 273.15).toFixed(0)}°C ({data.weather[0].main})</p>
                </div>
                <div
                  className="d-flex justify-content-between p-2"
                  style={{ borderBottom: "2px solid white" }}
                >
                  <p>Humidity </p>
                  <p>{data.main.humidity}%</p>
                </div>
                <div
                  className="d-flex justify-content-between p-2"
                  style={{ borderBottom: "2px solid white" }}
                >
                  <p>Wind Speed </p>
                  <p>{data.wind.speed} Km/h</p>
                </div>
                <div className="d-flex justify-content-between p-2">
                  <p>Visibility </p>
                  <p>{data.visibility} mi</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
