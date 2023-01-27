import { PageApiResult, PageSpec } from "../types";
import React, { useEffect, useState } from "react";

import ListPanel from "./list-panel";
import PageContext from "../contexts/page-context";
import { convertPageApiResultToPageSpec } from "../util";
import { getPageSpec } from "../apiWrapper";

const Page = ({ id }: { id: string }) => {
    const [pageSpec, setPageSpec] = useState<undefined | PageSpec>();

    useEffect(() => {
        getPageSpec(id).then((response) => {
            const apiResult: PageApiResult = response?.data;
            if (apiResult?.components && apiResult?.lists) {
                console.log(apiResult);
                setPageSpec(convertPageApiResultToPageSpec(apiResult));
            }
        });
    }, [id]);

    return pageSpec ? (
        <PageContext.Provider value={{ pageSpec, setPageSpec }}>
            <ListPanel listId={0} />
        </PageContext.Provider>
    ) : (
        <div>Loading...</div>
    );
};

export default Page;
