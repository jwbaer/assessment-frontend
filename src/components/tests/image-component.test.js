import { render, screen } from "@testing-library/react";

import ComponentPanel from "../component-panel";
import ImageComponent from "../image-component";
import PageContext from "../../contexts/page-context";
import { convertPageApiResultToPageSpec } from "../../util";

describe("<ImageComponent /> spec", () => {
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
                type: "image",
                options: {
                    src: "/locations/new-york.png",
                    alt: "Cartoon of New York skyline",
                },
            },
        ],
    };

    const pageSpec = convertPageApiResultToPageSpec(apiResult);

    it("renders the component", () => {
        const setPageSpec = jest.fn();
        const { asFragment } = render(
            <ImageComponent
                component={{
                    id: 1,
                    type: "image",
                    options: {
                        src: "/locations/new-york.png",
                        alt: "Cartoon of New York skyline",
                    },
                }}
            />
        );

        const image = screen.getByAltText("Cartoon of New York skyline");
        expect(image).toBeDefined();
        expect(asFragment()).toMatchSnapshot();
    });

    it("renders when specifed through the component panel", () => {
        const setPageSpec = jest.fn();
        const { asFragment } = render(
            <PageContext.Provider value={{ pageSpec, setPageSpec }}>
                <ComponentPanel componentId={1} />
            </PageContext.Provider>
        );

        const image = screen.getByAltText("Cartoon of New York skyline");
        expect(image).toBeDefined();
        expect(asFragment()).toMatchSnapshot();
    });
});
