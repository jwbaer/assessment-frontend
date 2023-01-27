import { PageApiResult, PageSpec } from "../types";
import React, { useEffect, useState } from "react";

import ListPanel from "./list-panel";
import PageContext from "../contexts/page-context";
import { convertPageApiResultToPageSpec } from "../util";
import { getPageSpec } from "../apiWrapper";

const Page = ({ id }: { id: string }) => {
    const [pageSpec, setPageSpec] = useState<undefined | PageSpec>();
    const [apiError, setApiError] = useState<undefined | string>();

    useEffect(() => {
        getPageSpec(id).then((response) => {
            const apiResult: PageApiResult = response?.data;
            if (apiResult?.components && apiResult?.lists) {
                setPageSpec(convertPageApiResultToPageSpec(apiResult));
            }
        }).catch((error) => {
            const errorObj = error.toJSON();
            if(errorObj.status == 404) {
                setApiError(`Page with ID "${id}" not found`);
            } else {
                setApiError(`Error loading page "${id}"`);
            }
        });
    }, [id]);

    return pageSpec ? (
        <PageContext.Provider value={{ pageSpec, setPageSpec }}>
            <ListPanel listId={0} />
        </PageContext.Provider>
    ) : (
        apiError?
            <div>{apiError}</div>
            :
            <div>Loading...</div>
    );
};

export default Page;
