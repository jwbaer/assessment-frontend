import { Component, List, PageApiResult, PageSpec, Variable, VariableDeclaration } from "../types";
import React, { createContext, useEffect, useState } from "react";

import ListPanel from "./list-panel";
import { getPageSpec } from "../apiWrapper";

export const PageContext = createContext({
    pageSpec: {
        componentIndex: new Map() as Map<number, Component>,
        listIndex: new Map() as Map<number, List>,
        variableIndex: new Map() as Map<string, Variable>,
    } as PageSpec,
    setPageSpec: (x: PageSpec | undefined) => {},
});

const Page = ({ id }: { id: string }) => {
    const [pageSpec, setPageSpec] = useState<undefined | PageSpec>();
    useEffect(() => {
        getPageSpec(id).then((response) => {
            const apiResult: PageApiResult = response?.data;
            if (apiResult?.components && apiResult?.lists) {
                console.log(apiResult);
                const componentIndex: Map<number, Component> = new Map(
                    apiResult.components.map((obj: Component) => [obj.id, obj])
                );
                const listIndex: Map<number, List> = new Map(
                    apiResult.lists.map((obj: List) => [obj.id, obj])
                );
                const variableIndex: Map<string, Variable> | undefined = apiResult.variables
                    ? new Map(
                          apiResult.variables.map((obj: VariableDeclaration) => [
                              obj.name,
                              { name: obj.name, type: obj.type, value: obj.initialValue },
                          ])
                      )
                    : undefined;

                setPageSpec({ componentIndex, listIndex, variableIndex });
            }
        });
    }, [id]);

    return pageSpec ? (
        <PageContext.Provider value={{ pageSpec, setPageSpec }}>
            <ListPanel id={0} />
        </PageContext.Provider>
    ) : (
        <div>Loading...</div>
    );
};

export default Page;
