import "./styles.scss";

import { Component, ImageOptions } from "../types";

import React from "react";

const ImageComponent = ({ component }: { component: Component }) => {
    const options = component?.options as ImageOptions;

    return options ? (
        <div data-testid={`image-component-${component.id}`} className="component image">
            <img
                data-testid={`image-component-${component.id}-image`}
                alt={options.alt}
                src={options.src}
            />
        </div>
    ) : (
        <></>
    );
};

export default ImageComponent;
