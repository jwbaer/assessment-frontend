import './styles.scss';

import React, { useContext } from "react";

import ComponentPanel from "./component-panel";
import { List } from "../types";
import PageContext from "../contexts/page-context";

const ListPanel = ({ listId }: { listId: number }) => {
    const { pageSpec } = useContext(PageContext);
    const listToRender: List | undefined = pageSpec.listIndex.get(listId);

    return listToRender?.components ? (
        <div className="list">
            {listToRender.components.map((compId) => (
                <ComponentPanel key={compId} componentId={compId} />
            ))}
        </div>
    ) : (
        <></>
    );
};

export default ListPanel;
