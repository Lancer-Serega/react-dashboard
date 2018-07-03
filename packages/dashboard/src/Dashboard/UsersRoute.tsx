import {Router} from "@reach/router";
import {observer} from "mobx-react";
import * as React from "react";
import {RouteComponent} from "./components/RouteComponent";
import {Form} from "./Users/Form";
import {List} from "./Users/List";

@observer
export class UsersRoute extends RouteComponent {
    render() {
        return <Router>
            <List path={"/"}/>
            <Form path={"/:id"}/>
        </Router>
    }
}