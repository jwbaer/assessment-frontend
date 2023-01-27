import "./styles.scss";

import { Component, WeatherApiResult, WeatherOptions } from "../types";
import React, { useCallback, useEffect, useRef, useState } from "react";

import ClearDay from "../icons/clear-day";
import Cloudy from "../icons/cloudy";
import Rain from "../icons/rain";
import { getWeather } from "../apiWrapper";

const WeatherComponent = ({ component }: { component: Component }) => {
    const options = component?.options as WeatherOptions;
    const mounted = useRef(false);
    const [weather, setWeather] = useState<undefined | WeatherApiResult>();
    const [apiError, setApiError] = useState(false);

    useEffect(() => {
        mounted.current = true;
        getWeather(options.lat, options.lon).then((response) => {
            const apiResult: WeatherApiResult = response?.data;
            if (apiResult && mounted.current) {
                setWeather(apiResult);
            }
        }).catch((error) => {
            if (mounted.current) {
                setApiError(true);
            }
        });
        return () => {
            mounted.current = false;
        };
    }, [options.lat, options.lon]);

    const getWeatherIcon = useCallback((condition: string) => {
        switch (condition) {
            case "rain":
                return <Rain />;
            case "cloudy":
                return <Cloudy />;
            case "clear-day":
                return <ClearDay />;
            default:
                return <></>;
        }
    }, []);

    return weather ? (
        <div
            className="component weather"
            data-testid={`weather-component-${component.id}`}
        >
            <div className="top-row">
                <div className="current-weather">
                    <div className="main-weather-icon">{getWeatherIcon(weather.condition)}</div>
                    <div className="current-temp-and-condition">
                        <div className="current-temp">
                            {weather.temperature}&deg;{weather.unit.toUpperCase()}
                        </div>
                        <div className="current-condition">{weather.conditionName}</div>
                    </div>
                </div>
                <div className="location">{weather.location}</div>
            </div>
            <div className="bottom-row">
                <div className="weather-icon">
                    {getWeatherIcon(weather.upcomming[0].condition)}
                    {weather.upcomming[0].day}
                </div>
                <div className="weather-icon">
                    {getWeatherIcon(weather.upcomming[1].condition)}
                    {weather.upcomming[1].day}
                </div>
                <div className="weather-icon">
                    {getWeatherIcon(weather.upcomming[2].condition)}
                    {weather.upcomming[2].day}
                </div>
            </div>
        </div>
    ) : (
        apiError ?
            <div className="component weather placeholder">Error loading weather</div>
            :
            <div className="component weather placeholder">Loading...</div>
    );
};

export default WeatherComponent;
