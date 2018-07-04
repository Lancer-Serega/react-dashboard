import * as React from "react";
import Breadcrumbs from './Breadcrumbs';
import {Form as PostForm} from "./Posts/Form";
import {List as PostsList} from "./Posts/List";
import {Form as UserForm} from "./Users/Form";
import {List as UsersList} from "./Users/List";
// import {Form as OrderForm} from "./Orders/Form";
// import {List as OrdersList} from "./Orders/List";
import {Form as ProductForm} from "./Products/Form";
import {List as ProductsList} from "./Products/List";
import {Router} from "@reach/router";
import {Layout} from "antd";

const {Content} = Layout;

class ContentDashboard extends React.Component {
    public render() {
        return (
            <Content style={{margin: "0 16px"}}>

                <Breadcrumbs location={location} />

                <div style={{padding: 24, background: "#fff", minHeight: 360}}>
                    <Router>
                        <UsersList path={"/users"} />
                        <UserForm path={"/users/:id"} />
                        <PostsList path={"/posts"} />
                        <PostForm path={"/posts/:id"} />
                        {/*<OrdersList path={"/orders"} />*/}
                        {/*<OrderForm path={"/orders/:id"} />*/}
                        <ProductsList path={"/products"} />
                        <ProductForm path={"/products/:id"} />
                    </Router>
                </div>
            </Content>
        )
    }
}

export default ContentDashboard;