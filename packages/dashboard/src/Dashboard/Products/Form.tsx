import {Spin} from "antd";
import gql from "graphql-tag";
import * as React from "react";
import {Query} from "react-apollo";
import {RouteComponent} from "../components/RouteComponent";

const query = gql`
    query product($_id: Int!) {
        product(_id: $_id) {
            _id
            name
            code
            price
            list_price
            quantity
            created
        }
    }
`;

export class Form extends RouteComponent<{ id?: string }> {
    render() {
        return <>
            <h3>Product {this.props.id}</h3>
            <Query query={query} variables={{_id: this.props.id}}>
                {({loading, data, error}) => {
                    debugger; // FIXME Delete before deploy!

                    if (loading) {
                        return <Spin/>

                    }
                    if (error) return <p>{error}</p>;

                    if (!data) {
                        return <h3>Not found</h3>
                    }

                    return <>
                        <p>ID: <b>{data.product._id}</b></p>
                        {/*<p>Image: {data.product.image}</p>*/}
                        <p>Name: <b>{data.product.name}</b></p>
                        <p>Code: <b>{data.product.code}</b></p>
                        <p>Price ($): <b>{data.product.price}</b></p>
                        <p>List price ($): <b>{data.product.list_price}</b></p>
                        <p>Quantity: <b>{data.product.quantity}</b></p>
                        <p>Created: <b>{new Date(data.product.created).toLocaleDateString()}</b></p>
                    </>
                }}
            </Query>
        </>
    }
}