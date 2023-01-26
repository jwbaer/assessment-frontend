import './styles.scss';

import { List, PageSpec } from "../types";
import React, { useContext } from "react";

import ComponentPanel from "./component-panel";
import { PageContext } from "./page";

const ListPanel = ({ id }: { id: number }) => {
    const { pageSpec } = useContext(PageContext);
    const listToRender: List | undefined = pageSpec.listIndex.get(id);

    return listToRender?.components ? (
        <div className="list">
            {listToRender.components.map((compId) => (
                <ComponentPanel key={compId} id={compId} />
            ))}
        </div>
    ) : (
        <></>
    );
};

export default ListPanel;
