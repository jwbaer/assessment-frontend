import { queryByAltText, render, screen } from "@testing-library/react";

import ComponentPanel from "../component-panel";
import ConditionComponent from "../condition-component";
import PageContext from "../../contexts/page-context";
import { convertPageApiResultToPageSpec } from "../../util";

describe("<ConditionComponent /> spec", () => {
    const apiResult = {
        variables: [
            {
                name: "show_image",
                type: "string",
                initialValue: "hide",
            },
        ],
        lists: [
            {
                id: 0,
                components: [1],
            },
            {
                id: 1,
                components: [2],
            },
        ],
        components: [
            {
                id: 1,
                type: "condition",
                type: "condition",
                options: {
                    variable: "show_image",
                    value: "show",
                },
                children: 1,
            },
            {
                id: 2,
                type: "image",
                options: {
                    src: "/locations/new-york.png",
                    alt: "Cartoon of New York skyline",
                },
            },
        ],
    };

    const pageSpec = convertPageApiResultToPageSpec(apiResult);

    it("does not render the child list when condition is false", () => {
        const setPageSpec = jest.fn();
        const { asFragment } = render(
            <PageContext.Provider value={{ pageSpec, setPageSpec }}>
                <ConditionComponent component={pageSpec.componentIndex.get(1)} />
            </PageContext.Provider>
        );

        expect(queryByAltText(asFragment(), "Cartoon of New York skyline")).toBeFalsy();
        expect(asFragment()).toMatchSnapshot();
    });

    it("renders the child list when condition is true", () => {
        pageSpec.variableIndex.get("show_image").value = "show";
        const setPageSpec = jest.fn();
        const { asFragment } = render(
            <PageContext.Provider value={{ pageSpec, setPageSpec }}>
                <ConditionComponent component={pageSpec.componentIndex.get(1)} />
            </PageContext.Provider>
        );

        const image = screen.getByAltText("Cartoon of New York skyline");
        expect(image).toBeDefined();
        expect(asFragment()).toMatchSnapshot();
    });

    it("renders when specifed through the component panel", () => {
        pageSpec.variableIndex.get("show_image").value = "show";
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
