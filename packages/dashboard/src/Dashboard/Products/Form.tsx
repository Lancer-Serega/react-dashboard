import {Spin} from "antd";
import gql from "graphql-tag";
import * as React from "react";
import {Query} from "react-apollo";
import {RouteComponent} from "../components/RouteComponent";

const query = gql`
    query ProductQuery($_id: Int!) {
        product(_id: $_id) {
            _id
            image
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
                    if (loading) {
                        return <Spin/>

                    }
                    if (error) return <p>{error}</p>;

                    if (!data) {
                        return <h3>Product Not found</h3>
                    }

                    const {product} = data;

                    return <div>
                        <p>Image: {product.image}</p>
                        <p>ID: <b>{product._id}</b></p>
                        <p>Name: <b>{product.name}</b></p>
                        <p>Code: <b>{product.code}</b></p>
                        <p>Price ($): <b>{product.price}</b></p>
                        <p>List price ($): <b>{product.list_price}</b></p>
                        <p>Quantity: <b>{product.quantity}</b></p>
                        <p>Created: <b>{new Date(product.created).toLocaleDateString()}</b></p>
                    </div>
                }}
            </Query>
        </>
    }
}