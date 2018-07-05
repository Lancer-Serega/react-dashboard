import * as React from "react";
import {Query} from "react-apollo";
import gql from "graphql-tag";
import {Spin, Tabs} from "antd";
import Information from "./TabsPane/Information";
import OptionsSettings from "./TabsPane/OptionsSettings";
import PricingInventory from "./TabsPane/PricingInventory";
import Availability from "./TabsPane/Availability";
import Extra from "./TabsPane/Extra";

const query = gql`
    query ProductQuery($_id: Int!) {
        product(_id: $_id) {
            _id
            image
            name
            code
            status
            price
            list_price
            quantity
            vendor
            fullDescription
            created
        }
    }
`;

class General extends React.Component<{ productId?: string }> {
    public render() {
        return (
            <Query query={query} variables={{_id: this.props.productId}}>
                {({loading, data, error}) => {
                    if (loading) {
                        return <Spin/>
                    }

                    if (error) return <p>{error}</p>;

                    if (!data) {
                        return <h3>Product Not found</h3>
                    }

                    const {product} = data;
                    const {TabPane} = Tabs;

                    return <div>
                        <Tabs defaultActiveKey="information" type="card">
                            <TabPane tab="Information" key="information">
                                <Information productId={product._id}
                                             name={product.name}
                                             price={product.price}
                                             vendor={product.vendor}
                                             image={product.image}
                                             fullDescription={product.fullDescription} />
                            </TabPane>
                            <TabPane tab="Options settings" key="options_settings"><OptionsSettings /></TabPane>
                            <TabPane tab="Pricing / inventory" key="pricing_inventory"><PricingInventory /></TabPane>
                            <TabPane tab="Availability" key="availability"><Availability /></TabPane>
                            <TabPane tab="Extra" key="extra"><Extra /></TabPane>
                        </Tabs>
                        <hr />
                        <p>Image: {product.image}</p>
                        <p>ID: <b>{product._id}</b></p>
                        <p>Name: <b>{product.name}</b></p>
                        <p>Code: <b>{product.code}</b></p>
                        <p>Status: <b>{product.status}</b></p>
                        <p>Price ($): <b>{product.price}</b></p>
                        <p>List price ($): <b>{product.list_price}</b></p>
                        <p>Quantity: <b>{product.quantity}</b></p>
                        <p>Created: <b>{new Date(product.created).toLocaleDateString()}</b></p>
                    </div>
                }}
            </Query>
        )
    }
}

export default General;