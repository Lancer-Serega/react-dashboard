import {Input, Spin} from "antd";
import gql from "graphql-tag";
import * as React from "react";
import {Query} from "react-apollo";
import {RouteComponent} from "../components/RouteComponent";

const query = gql`
    query OrderQuery($_id: Int!) {
        order(_id: $_id) {
#            product {
#                image
#                title
#                idAli
#                price
#                status
#                listPrice
#                quantity
#                count
#                vendor
#                created
#            }
            _id
            errorNotes
            created
            customerId
            customerName
            customerAddress
            buyerId
            buyerEmail
            buyerName
            buyerAddress
            vendorId
            vendorName
            vendorStatus
            vendorNumber
            cost
            statusDW
            numberDW
            shippingMethod
            shippingCountry
            trackingNumber
        }
    }
`;

export class Form extends RouteComponent<{ id?: string }> {
    render() {
        return <>
            <h3>Order {this.props.id}</h3>
            <Query query={query} variables={{_id: this.props.id}}>
                {({loading, data, error}) => {
                    if (loading) {
                        return <Spin/>
                    }

                    if (error) return <p>{error}</p>;

                    const {order} = data;

                    if (!order) {
                        return <h3>Not found</h3>
                    }

                    return <section className="form-inputs">
                        <div>
                            <label>ID: {'\u00A0'}
                                <Input value={this.props.id} disabled />
                            </label>
                        </div>

                        <div>
                            <label>Number Dropwow: {'\u00A0'}
                                <Input placeholder="Number Dropwow" value={order.numberDW} />
                            </label>
                        </div>

                        <div>
                            <label>Number Vendor: {'\u00A0'}
                                <Input placeholder="Number vendor" value={order.vendorNumber} />
                            </label>
                        </div>

                        <div>
                            <label>Created: {'\u00A0'}
                                <Input placeholder="Created date" value={order.created} />
                            </label>
                        </div>

                        <div>
                            <label>Status Dropwow: {'\u00A0'}
                                <Input placeholder="Created date" value={order.statusDW} />
                            </label>
                        </div>

                        <div>
                            <label>Status AliExpress: {'\u00A0'}
                                <Input placeholder="Status AliExpress" value={order.vendorStatus} />
                            </label>
                        </div>

                        <div>
                            <label>Tracking number: {'\u00A0'}
                                <Input placeholder="Tracking number" value={order.trackingNumber.join(', ').toUpperCase()} />
                            </label>
                        </div>

                        <div>
                            <label>Vendor: {'\u00A0'}
                                <Input placeholder="Vendor" value={order.vendorName} />
                            </label>
                        </div>

                        <div>
                            <label>Cost: {'\u00A0'}
                                <Input placeholder="Cost" value={order.cost} />
                            </label>
                        </div>

                        <div>
                            <label>Buyer: {'\u00A0'}
                                <Input placeholder="Buyer" value={order.buyerName} />
                            </label>
                        </div>

                        <div>
                            <label>Buyer: {'\u00A0'}
                                <Input type="textarea" placeholder="Error Notes" value={order.errorNotes} />
                            </label>
                        </div>
                    </section>
                }}
            </Query>
        </>
    }
}