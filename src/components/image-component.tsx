import "./styles.scss";

import { Component, ImageOptions } from "../types";

import React from "react";

const ImageComponent = ({ component }: { component: Component }) => {
    const options = component?.options as ImageOptions;

    return options ? (
        <div className="component image">
            <img alt={options.alt} src={options.src} />
        </div>
    ) : (
        <></>
    );
};

export default ImageComponent;
