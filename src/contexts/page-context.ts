import { Component, List, PageSpec, Variable, } from "../types";

import { createContext } from "react";

const PageContext = createContext({
    pageSpec: {
        componentIndex: new Map() as Map<number, Component>,
        listIndex: new Map() as Map<number, List>,
        variableIndex: new Map() as Map<string, Variable>,
    } as PageSpec,
    setPageSpec: (x: PageSpec | undefined) => {},
});

export default PageContext;