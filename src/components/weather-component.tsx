import { Component, WeatherApiResult, WeatherOptions } from '../types';
import React, { useEffect, useState } from 'react';

import { getWeather } from '../apiWrapper';

const WeatherComponent = ({ component }: { component: Component }) => {
    const options = component?.options as WeatherOptions;
    const [weather, setWeather] = useState<undefined | WeatherApiResult>();
    useEffect(() => {
        getWeather(options.lat, options.lon).then(response => {
            const apiResult: WeatherApiResult = response?.data;
            if (apiResult) {
                console.log(apiResult);
                setWeather(apiResult);
            }
        });
    }, [options.lat, options.lon]);

    return (
        weather?
            <div style={{display: 'flex', backgroundColor: '#36f', borderRadius: '1em', maxWidth: '300px', height: "130px", flexDirection: 'column', justifyContent: 'center', overflow: 'hidden'}}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div style={{ display: 'flex', justifySelf: 'left'}}>
                        {weather.temperature}
                    </div>
                    <div style={{ display: 'flex', justifySelf: 'right'}}>
                        {weather.location}
                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div style={{ display: 'flex', justifySelf: 'right', flexDirection:'row'}}>
                        {weather.upcomming[0].day}
                        {weather.upcomming[1].day}
                        {weather.upcomming[2].day}
                    </div>
                </div>
            </div>
            :
            <></>
    );
};

export default WeatherComponent;