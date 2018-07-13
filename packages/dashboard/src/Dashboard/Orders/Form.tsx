import {Spin} from "antd";
import gql from "graphql-tag";
import * as React from "react";
import {Query} from "react-apollo";
import {RouteComponent} from "../components/RouteComponent";

const query = gql`
    query OrderQuery($_id: Int!) {
        order(_id: $_id) {
            product {
                _id
                image
                title
                idAli
                price
            }
            createdDate
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
            price
            dwStatus
            dwNumber
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

                    if (!data) {
                        return <h3>Not found</h3>
                    }

                    return <>
                        <p>ID: <b>{data.order._id}</b></p>
                        <p>Number Dropwow: <b>{data.order.numberDW}</b></p>
                        <p>Number AliExpress: <b>{data.order.numberAli}</b></p>
                        <p>Created: <b>{new Date(data.order.created).toLocaleDateString()}</b></p>
                        <p>Status Dropwow: <b>{data.order.statusDW}</b></p>
                        <p>Status AliExpress: <b>{data.order.statusAli}</b></p>
                        <p>Tracking number: <b>{data.order.trackingNumber.join(', ')}</b></p>
                        <p>vendor: <b>{data.order.vendor}</b></p>
                        <p>Cost: <b>{data.order.cost}</b></p>
                        <p>Buyer: <b>{data.order.buyer}</b></p>
                        <p>Errors, notes: <b>{data.order.errorsNotes.join('. ')}</b></p>
                    </>
                }}
            </Query>
        </>
    }
}