import {Router} from "@reach/router";
import * as React from "react";
import {RouteComponent} from "./components/RouteComponent";
import {Form} from "./Posts/Form";
import {List} from "./Posts/List";

export class PostsRoute extends RouteComponent {
    render() {
        return <Router>
            <List path={"/"}/>
            <Form path={"/:id"}/>
        </Router>
    }
}