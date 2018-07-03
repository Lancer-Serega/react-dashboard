import {Location} from "@reach/router";
import ApolloClient from "apollo-boost";
import * as React from "react";
import {ApolloProvider} from "react-apollo";
import {DynamicRoute} from "../routes";
import {Route} from "../types/Route";
import {App} from "./App";
import "./assets/styles.ts";
import {LocalState} from "../stores/LocalState";
import {SearchStore} from "../stores/SearchStore";

const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
});

// Global stores which are affect observers
const globalStores = {
    state: new LocalState(),
    search: new SearchStore(),
};

type LoaderProps = {
    routes: Route[];
    mapping: DynamicRoute;
}

export const Loader: React.StatelessComponent<LoaderProps> = ({routes, mapping}) => (
    <ApolloProvider client={client}>
        <Location>
            {props => <App path={props.location.pathname}
                           routes={routes}
                           mapping={mapping}
                           {...globalStores}/>}
        </Location>
    </ApolloProvider>
);

export default Loader;