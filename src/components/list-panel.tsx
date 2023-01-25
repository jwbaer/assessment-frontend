import { List, PageSpec } from '../types';

import ComponentPanel from './component-panel';
import React from 'react';

const ListPanel = ({ pageSpec, id }: { pageSpec: PageSpec, id: number }) => {
    const listToRender: List | undefined = pageSpec.listIndex.get(id);
    console.log(listToRender);

    return (
        listToRender?.components ?
            <>
                {listToRender.components.map(compId => (<ComponentPanel key={compId} pageSpec={pageSpec} id={compId} />))}
            </>
            :
            <></>
    );
};

export default ListPanel;