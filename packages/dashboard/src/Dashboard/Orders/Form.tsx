import {Spin} from "antd";
import gql from "graphql-tag";
import * as React from "react";
import {Query} from "react-apollo";

const query = gql`
    query order($_id: Int!) {
        order(_id: $_id) {
            _id
            status
            customer {
                _id
                email
            }
            wallet
            overdue
            tracking
            vendor_status
            total
            created
        }
    }
`;

export class Form extends React.Component<{ id?: string }> {
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
                        <p>Status: <b>{data.order.status}</b></p>
                        <p>Customer: <b>{data.order.customer}</b></p>
                        <p>Wallet: <b>{data.order.wallet}</b></p>
                        <p>Overdue: <b>{new Date(data.order.overdue).toLocaleDateString()}</b></p>
                        <p>Tracking: <b>{data.order.tracking}</b></p>
                        <p>Vendor status: <b>{data.order.vendor_status}</b></p>
                        <p>Total: <b>{data.order.total}</b></p>
                        <p>Created: <b>{new Date(data.order.created).toLocaleDateString()}</b></p>
                    </>
                }}
            </Query>
        </>
    }
}