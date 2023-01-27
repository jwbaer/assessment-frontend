import { Component, List, PageApiResult, PageSpec, Variable, VariableDeclaration } from "./types";

export const convertPageApiResultToPageSpec = (apiResult: PageApiResult): PageSpec => {
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

    return({ componentIndex, listIndex, variableIndex });
}
