import React, { useEffect, useState } from 'react'
import './Home.scss';
import gif from './../../../asset/w.gif';

function Home() {

    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [weather, setWeather] = useState({});

    const onSubmit = (evt: any) => {
        evt.preventDefault();
        setLoading(true);
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&APPID=6b32b56f50bc7252db88914605a110e8`)
            .then(res => res.json())
            .then(result => {
                setWeather(result);
                setLoading(false);
            });
    }
    useEffect(() => {
        if (query === '') {
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=HaNoi&APPID=6b32b56f50bc7252db88914605a110e8`)
                .then(res => res.json())
                .then(result => {
                    setWeather(result);
                    setQuery('');
                });
        }
    }, [query])
    const dateBuilder = (d: any) => {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return `${day} ${date} ${month} ${year}`
    }
    const showCity: any = (weather: any) => {
        if (weather) {
            return weather?.name + " city, " + weather?.sys?.country;
        }
    }
    const showC: any = (weather: any) => {
        if (weather) {
            return Math.round(weather?.main?.temp-273.15);
        }
    }
    const showWind: any = (weather: any) => {
        if (weather) {
            return weather?.wind?.speed;
        }
    }
    const showCould: any = (weather: any) => {
        if (weather) {
            if (weather?.weather) {
                return weather?.weather[0]?.description;
            }
        } else {
            return "Loading"
        }
    }
    const showHumain: any = (weather: any) => {
        if (weather) {
            return weather?.main?.humidity;
        }
    }
    const showCouldICon: any = (weather: any) => {
        if (weather) {
            if (weather?.weather) {
                return <img alt="" src={`http://openweathermap.org/img/wn/${weather?.weather[0]?.icon}@2x.png`} />;

            }
        } else {
            return "Loading"
        }
    }
    return (
        <div className="container">
            <div className="container-main">
                <form onSubmit={onSubmit} className="container-search">
                    <input onChange={(e) => setQuery(e.target.value)} placeholder="Search country or city..." />
                </form>
                <div className="container-main-top">
                    {loading ? <>
                        Loading
                    </> :
                        <><div className="top-left">
                            <div className="icon">
                                {showCouldICon(weather)}
                            </div>
                            <p>{showC(weather)}</p>
                            <div className="info"><label>°C</label></div>
                            <div className="detail">
                                <span>Chances of rain: 16%</span>
                                <span>
                                    Humidity: {showHumain(weather)}%</span>
                                <span>Wind: {showWind(weather)} km/h</span>
                            </div>
                        </div>
                            <div className="top-right">
                                <p> {showCity(weather)}</p>
                                <p>{dateBuilder(new Date())}</p>
                                <p>{showCould(weather)}</p>
                            </div>
                        </>}
                </div>
                <div className="gif">
                    <img alt="" src={gif}/>
                </div>
            </div>
        </div>
    )
}
export default Home;