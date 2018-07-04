import {Router} from "@reach/router";
import * as React from "react";
import {RouteComponent} from "./components/RouteComponent";
import {Form} from "./Products/Form";
import {List} from "./Products/List";
import {observer} from "mobx-react";

@observer
export class ProductsRoute extends RouteComponent {
    render() {
        return <Router>
            <List path={"/"}/>
            <Form path={"/:id"}/>
        </Router>
    }
}