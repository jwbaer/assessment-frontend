import * as apiWrapper from "../../apiWrapper";

import { act, render, screen, waitFor } from "@testing-library/react";

import ComponentPanel from "../component-panel";
import PageContext from "../../contexts/page-context";
import WeatherComponent from "../weather-component";
import { convertPageApiResultToPageSpec } from "../../util";

jest.mock("../../apiWrapper");

describe("<WeatherComponent /> spec", () => {
    beforeEach(() => jest.clearAllMocks());

    const apiResult = {
        lists: [
            {
                id: 0,
                components: [1],
            },
        ],
        components: [
            {
                id: 1,
                type: "weather",
                options: {
                    lon: "40.748607102729295",
                    lat: "-73.98563758004718",
                },
            },
        ],
    };

    const data = {
        lon: "40.748607102729295",
        lat: "-73.98563758004718",
        condition: "cloudy",
        conditionName: "Cloudy",
        temperature: 78,
        unit: "f",
        location: "New York, NY",
        upcomming: [
            {
                day: "Fri",
                condition: "cloudy",
                conditionName: "Cloudy",
            },
            {
                day: "Sat",
                condition: "cloudy",
                conditionName: "Cloudy",
            },
            {
                day: "Sun",
                condition: "rain",
                conditionName: "Rain",
            },
        ],
    };

    const pageSpec = convertPageApiResultToPageSpec(apiResult);

    it("renders the component", async () => {
        apiWrapper.getWeather.mockResolvedValue({ data });
        const { asFragment } = render(
            <WeatherComponent
                component={{
                    id: 1,
                    type: "weather",
                    options: {
                        lon: "40.748607102729295",
                        lat: "-73.98563758004718",
                    },
                }}
            />
        );

        expect(screen.getByText("Loading...")).toBeDefined();

        await act(
            async () =>
                await waitFor(() => {
                    expect(screen.getByText("New York, NY")).toBeDefined();
                    expect(screen.getByText(/78.F/i)).toBeDefined();
                    expect(screen.getByText("Cloudy")).toBeDefined();
                    expect(screen.getByText("Fri")).toBeDefined();
                    expect(screen.getByText("Sat")).toBeDefined();
                    expect(screen.getByText("Sun")).toBeDefined();
                    expect(asFragment()).toMatchSnapshot();
                })
        );
    });

    it("renders an error on a API error", async () => {
        apiWrapper.getWeather.mockRejectedValue({});
        const { asFragment } = render(
            <WeatherComponent
                component={{
                    id: 1,
                    type: "weather",
                    options: {
                        lon: "40.748607102729295",
                        lat: "-73.98563758004718",
                    },
                }}
            />
        );

        expect(screen.getByText("Loading...")).toBeDefined();

        await act(
            async () =>
                await waitFor(() => {
                    expect(screen.getByText("Error loading weather")).toBeDefined();
                    expect(asFragment()).toMatchSnapshot();
                })
        );
    });

    it("renders when specifed through the component panel", async () => {
        apiWrapper.getWeather.mockResolvedValue({
            data,
        });

        const setPageSpec = jest.fn();
        const { asFragment } = render(
            <PageContext.Provider value={{ pageSpec, setPageSpec }}>
                <ComponentPanel componentId={1} />
            </PageContext.Provider>
        );

        expect(screen.getByText("Loading...")).toBeDefined();

        await act(
            async () =>
                await waitFor(() => {
                    expect(screen.getByText("New York, NY")).toBeDefined();
                    expect(screen.getByText(/78.F/i)).toBeDefined();
                    expect(screen.getByText("Cloudy")).toBeDefined();
                    expect(screen.getByText("Fri")).toBeDefined();
                    expect(screen.getByText("Sat")).toBeDefined();
                    expect(screen.getByText("Sun")).toBeDefined();
                    expect(asFragment()).toMatchSnapshot();
                })
        );
    });
});
