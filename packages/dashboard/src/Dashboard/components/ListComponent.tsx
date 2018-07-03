import {navigate} from "@reach/router";
import {PaginationConfig} from "antd/es/pagination";
import * as React from "react";
import {delay} from "../../utils/delay";
import {RouteComponent} from "./RouteComponent";

type ListNode = {
    count: number;
    limit: number;
    skip: number
}

type State = {
    skip: number;
    limit: number;
    search: any;
    variables: any;
};

type Props<P = {}> = P & {path?: string} | P & {default?: boolean};

export class ListComponent<P = {}> extends RouteComponent<Props<P>, State> {
    public state = {skip: 0, limit: 10, search: {}, variables: {}};

    protected handlePageChange = (page: number, size: number) => {
        const applyState = () => {
            return {skip: --page * size}
        };

        this.setState(applyState, this.handleUpdateState)
    };

    protected handleResetState = () => {
        const applyState = () => {
            return {skip: 0, limit: 10, search: {}};
        };

        this.setState(applyState, this.handleUpdateState);
    };

    protected handleFilterChange = (key: string, value: any) => {
        const applyState = (prevState: State) => {
            return {
                search: {
                    ...prevState.search,
                    [key]: value,
                }
            }
        };

        this.setState(applyState, this.handleUpdateStateDelayed);
    };

    private handleUpdateState = () => {
        const applyState = () => {
            return {
                variables: {
                    limit: {
                        skip: this.state.skip,
                        limit: this.state.limit,
                    },
                    search: this.state.search
                }
            }
        };

        this.setState(applyState, () => {
            const params = new URLSearchParams();
            params.set(
                "state",
                JSON.stringify(this.getQueryVariables())
            );

            navigate(
                location.pathname.concat("?", `${params}`),
                {replace: true}
            );
        })
    };

    private handleUpdateStateDelayed = delay(this.handleUpdateState);

    getTablePagination(loading: boolean, fn: () => ListNode): PaginationConfig | false {
        if (loading) {
            return false;
        }

        const {count, limit, skip} = fn();
        return {
            current: (limit + skip) / limit,
            pageSize: limit,
            total: count,
            onChange: (page, size) => this.handlePageChange(page, size || limit)
        };
    }

    getQueryVariables() {
        return this.state.variables;
    }
}