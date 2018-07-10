import {Router} from "@reach/router";
import * as React from "react";
import {RouteComponent} from "./components/RouteComponent";
import {Form} from "./Orders/Form";
import {List} from "./Orders/List";
import {observer} from "mobx-react";

@observer
export class OrdersRoute extends RouteComponent {
    render() {
        return <Router>
            <List path={"/"}/>
            <Form path={"/:id"}/>
        </Router>
    }
}