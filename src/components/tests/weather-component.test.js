import { render, screen } from "@testing-library/react";

import ComponentPanel from "../component-panel";
import PageContext from "../../contexts/page-context";
import WeatherComponent from "../weather-component";
import axios from 'axios';
import { convertPageApiResultToPageSpec } from "../../util";

jest.mock('axios');

describe("<WeatherComponent /> spec", () => {

    const apiResult= {
        lists: [
            {
                id: 0,
                components: [1],
            },
        ],
        components: [
            {
                id: 1,
                type: 'weather',
                options: {
                    lon: '40.748607102729295',
                    lat: '-73.98563758004718',
                }
            },
        ],
    };

    const weatherApiResponse = {
        data: {
            lon: '40.748607102729295',
            lat: '-73.98563758004718',
            condition: 'cloudy',
            conditionName: 'Cloudy',
            temperature: 78,
            unit: 'f',
            location: 'New York, NY',
            upcomming: [
                {
                    day: 'Fri',
                    condition: 'cloudy',
                    conditionName: 'Cloudy',
                },
                {
                    day: 'Sat',
                    condition: 'cloudy',
                    conditionName: 'Cloudy',
                },
                {
                    day: 'Sun',
                    condition: 'rain',
                    conditionName: 'Rain',
                },
            ],
        },
    };

    const pageSpec = convertPageApiResultToPageSpec(apiResult);

    it("renders the component", () => {
        axios.get.mockResolvedValueOnce(weatherApiResponse)
        const setPageSpec = jest.fn();
        const { asFragment } = render(
            <WeatherComponent component={{
                id: 1,
                type: 'weather',
                options: {
                    lon: '40.748607102729295',
                    lat: '-73.98563758004718',
                }
            }}/>
        );

        expect(screen.getByText('Loading...')).toBeDefined();

        setTimeout(() => {
            expect(screen.getByText('New York, NY')).toBeDefined();
            expect(screen.getByText('78˚F')).toBeDefined();
            expect(screen.getByText('Cloudy')).toBeDefined();
            expect(screen.getByText('Fri')).toBeDefined();
            expect(screen.getByText('Sat')).toBeDefined();
            expect(screen.getByText('Sun')).toBeDefined();
            expect(asFragment()).toMatchSnapshot();
        }, 100);
    });

    it("renders when specifed through the component panel", () => {
        axios.get.mockResolvedValueOnce(weatherApiResponse)
        const setPageSpec = jest.fn();
        const { asFragment } = render(
            <PageContext.Provider value={{ pageSpec, setPageSpec}}>
                <ComponentPanel componentId={1} />
            </PageContext.Provider>
        );

        expect(screen.getByText('Loading...')).toBeDefined();

        setTimeout(() => {
            expect(screen.getByText('New York, NY')).toBeDefined();
            expect(screen.getByText('78˚F')).toBeDefined();
            expect(screen.getByText('Cloudy')).toBeDefined();
            expect(screen.getByText('Fri')).toBeDefined();
            expect(screen.getByText('Sat')).toBeDefined();
            expect(screen.getByText('Sun')).toBeDefined();
            expect(asFragment()).toMatchSnapshot();
        }, 100);
    });
});
