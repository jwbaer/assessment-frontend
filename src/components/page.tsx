import { Component, List, PageApiResult, PageSpec, Variable, VariableDeclaration } from '../types';
import React, { createContext, useEffect, useState } from 'react';

import ListPanel from './list-panel'
import { getPageSpec } from '../apiWrapper';
import { type } from 'os';

const PageContext = createContext({});

const Page = ({ id }: { id: string }) => {
    const [pageSpec, setPageSpec] = useState<undefined | PageSpec>();
    useEffect(() => {
        getPageSpec(id).then(response => {
            const apiResult: PageApiResult = response?.data;
            if (apiResult?.components && apiResult?.lists) {
                console.log(apiResult);
                const componentIndex: Map<number, Component> = new Map(apiResult.components.map((obj: Component) => [obj.id, obj]));
                const listIndex: Map<number, List> = new Map(apiResult.lists.map((obj: List) => [obj.id, obj]));
                const variableIndex: Map<string, Variable> | undefined = apiResult.variables ? new Map(apiResult.variables.map((obj: VariableDeclaration) => [obj.name, {name: obj.name, type: obj.type, value: obj.initialValue}])): undefined;

                setPageSpec({ componentIndex, listIndex, variableIndex, rootList: apiResult.lists[0].id });
            }
        });
    }, [id]);
    console.log(pageSpec);

    return (
        pageSpec ?
            <PageContext.Provider value={pageSpec}>
                <ListPanel pageSpec={pageSpec} id={pageSpec.rootList} />
            </PageContext.Provider>
            :
            <div>Loading...</div>
    );
};

export default Page;