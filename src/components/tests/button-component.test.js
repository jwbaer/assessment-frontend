import { fireEvent, queryByAltText, queryByTestId, render, screen } from "@testing-library/react";

import ButtonComponent from "../button-component";
import ComponentPanel from "../component-panel";
import ListPanel from "../list-panel";
import PageContext from "../../contexts/page-context";
import { convertPageApiResultToPageSpec } from "../../util";

describe("<ButtonComponent /> spec", () => {
    const apiResult= {
        variables: [
            {
                name: 'show_image',
                type: 'string',
                initialValue: 'hide',
            },
        ],
        lists: [
            {
                id: 0,
                components: [1, 2]
            },
            {
                id: 1,
                components: [3]
            }
        ],
        components: [
            {
                id: 1,
                type: 'button',
                options: {
                    text: 'Show',
                    icon: 'show',
                    variable: 'show_image',
                    value: 'show',
                },
            },
            {
                id: 2,
                type: 'condition',
                options: {
                    variable: 'show_image',
                    value: 'show',
                },
                children: 1,
            },
            {
                id: 3,
                type: "image",
                options: {
                    src: "/locations/new-york.png",
                    alt: "Cartoon of New York skyline",
                },
            },
        ],
    };

    let pageSpec = convertPageApiResultToPageSpec(apiResult);

    const setPageSpec = jest.fn((spec) => pageSpec = spec);

    it("renders", () => {
        const { asFragment } = render(
            <PageContext.Provider value={{ pageSpec, setPageSpec}}>
                <ButtonComponent component={pageSpec.componentIndex.get(1)} />
            </PageContext.Provider>
        );

        expect(screen.getByText(/Show/i)).toBeDefined();
        expect(asFragment()).toMatchSnapshot();
    });

    it("renders through the component panel", () => {
        const { asFragment } = render(
            <PageContext.Provider value={{ pageSpec, setPageSpec}}>
                <ComponentPanel componentId={1} />
            </PageContext.Provider>
        );

        expect(screen.getByText(/Show/i)).toBeDefined();
        expect(asFragment()).toMatchSnapshot();
    });

    it("renders all components as list, and changes value when clicked on", () => {
        const { asFragment } = render(
            <PageContext.Provider value={{ pageSpec, setPageSpec}}>
                <ListPanel listId={0} />
            </PageContext.Provider>
        );

        expect(asFragment()).toMatchSnapshot();
        expect(screen.getByText(/Show/i)).toBeDefined();
        fireEvent.click(screen.getByTestId("button-component-1"));
        expect(setPageSpec).toHaveBeenCalled();
        expect(pageSpec.variableIndex.get('show_image').value).toBe('show');
    });

});
