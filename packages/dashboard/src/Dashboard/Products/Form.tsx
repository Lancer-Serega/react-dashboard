import {Tabs} from "antd";
import * as React from "react";
import {RouteComponent} from "../components/RouteComponent";
import General from "./TabsPane/General/General";
import Images from "./TabsPane/Images/Images";
import SEO from "./TabsPane/SEO/SEO";
import Options from "./TabsPane/Options/Options";
import ShippingProperties from "./TabsPane/ShippingProperties/ShippingProperties";
import QuantityDiscounts from "./TabsPane/QuantityDiscounts/QuantityDiscounts";
import Subscribers from "./TabsPane/Subscribers/Subscribers";
import Features from "./TabsPane/Features/Features";
import ProductTabs from "./TabsPane/ProductTabs/ProductTabs";
import Layouts from "./TabsPane/Layouts/Layouts";

export class Form extends RouteComponent<{ id: number }> {
    render() {
        const {TabPane} = Tabs;

        return <>
            <h3>Product {this.props.id}</h3>
            <Tabs defaultActiveKey="general">
                <TabPane tab="General" key="general"><General productId={this.props.id}/></TabPane>
                <TabPane tab="Images" key="images"><Images productId={this.props.id}/></TabPane>
                <TabPane tab="SEO" key="seo"><SEO productId={this.props.id}/></TabPane>
                <TabPane tab="Options" key="options"><Options productId={this.props.id}/></TabPane>
                <TabPane tab="Shipping Properties" key="shipping_properties"><ShippingProperties productId={this.props.id}/></TabPane>
                <TabPane tab="Quantity discounts" key="quantity_discounts"><QuantityDiscounts productId={this.props.id}/></TabPane>
                <TabPane tab="Subscribers" key="subscribers"><Subscribers productId={this.props.id}/></TabPane>
                <TabPane tab="Features" key="features"><Features productId={this.props.id}/></TabPane>
                <TabPane tab="Product tabs" key="product_tabs"><ProductTabs productId={this.props.id}/></TabPane>
                <TabPane tab="Layouts" key="layouts"><Layouts productId={this.props.id}/></TabPane>
            </Tabs>
        </>
    }
}