import React, {Component} from "react";
import Breadcrumbs from './Breadcrumbs';
import {Form as PostForm} from "./Posts/Form";
import {List as PostsList} from "./Posts/List";
import {Form as UserForm} from "./Users/Form";
import {List as UsersList} from "./Users/List";
import {Form as OrderForm} from "./Orders/Form";
import {List as OrdersList} from "./Orders/List";
import {Form as ProductForm} from "./Products/Form";
import {List as ProductsList} from "./Products/List";
import {Router, navigate} from "@reach/router";
import {Layout} from "antd";

const {Content} = Layout;

class ContentDashboard extends Component {
    public render() {
        return (
            <Content style={{margin: "0 16px"}}>

                <Breadcrumbs location={location} />

                <div style={{padding: 24, background: "#fff", minHeight: 360}}>
                    <Router>
                        <UsersList path={"/users"} Content={this} />
                        <UserForm path={"/users/:id"} />
                        <PostsList path={"/posts"} Content={this} />
                        <PostForm path={"/posts/:id"} />
                        <OrdersList path={"/orders"} Content={this} />
                        <OrderForm path={"/orders/:id"} />
                        <ProductsList path={"/products"} Content={this} />
                        <ProductForm path={"/products/:id"} />
                    </Router>
                </div>
            </Content>
        )
    }
}

export default ContentDashboard;