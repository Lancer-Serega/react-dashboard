import ApolloClient from "apollo-boost";
import * as React from "react";
import {ApolloProvider} from "react-apollo";
import * as ReactDOM from "react-dom";
import {App} from "./Dashboard/App";
import "./Dashboard/assets/styles.ts";

const client = new ApolloClient({
    uri: "http://localhost:4000/graphql"
});

ReactDOM.render(
    <>
        <ApolloProvider client={client}>
            <App/>
        </ApolloProvider>
    </>,
    document.getElementById("react")
);
