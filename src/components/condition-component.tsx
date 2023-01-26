import "./styles.scss";

import { Component, ConditionOptions } from "../types";
import React, { useContext } from "react";

import ListPanel from "./list-panel";
import { PageContext } from "./page";

const ConditionComponent = ({ component }: { component: Component }) => {
    const { pageSpec } = useContext(PageContext);
    const options = component?.options as ConditionOptions;

    return options?.variable &&
        pageSpec?.variableIndex?.get(options.variable)?.value === options.value &&
        component.children ? (
        <ListPanel id={component.children} />
    ) : (
        <></>
    );
};

export default ConditionComponent;
