// Entrypoint does authorization:
// 1. Check session and
// 2. Load authorization page, or
// 3. Load dashboard layout and
// 4. Get accessible routes for user

import * as React from "react";
import * as ReactDOM from "react-dom";
import {RouteMapping} from "./routes";
import {Route} from "./types/Route";

async function checkAuth() {
    return !location.search.includes("logout");
}

async function fetchRoutes(): Promise<Route[]> {
    return require("./routes.json");
}

async function main() {
    const authorized = await checkAuth();
    let Component: any;
    let props = {};

    if (authorized) {
        const module = await import(/* webpackChunkName: "dashboard" */"./Dashboard");

        props = {
            routes: await fetchRoutes(),
            mapping: RouteMapping
        };

        Component = module.Loader;
    } else {
        const module = await import(/* webpackChunkName: "dashboard" */"./Authorization");

        Component = module.Loader;
    }

    ReactDOM.render(
        <Component {...props} />,
        document.getElementById("react")
    );
}

main();