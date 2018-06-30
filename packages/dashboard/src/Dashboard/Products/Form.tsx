import {Divider, Icon, Spin, Table} from "antd";
import gql from "graphql-tag";
import * as React from "react";
import {Query} from "react-apollo";
import {Link} from "../components/Link";

const query = gql`
    query product($_id: Int!) {
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

export class Form extends React.Component<{ id?: string }> {
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
                        return <h3>Not found</h3>
                    }

                    return <>

                        <p>ID: <b>{data.product._id}</b></p>
                        <p>Image: <b>{data.product.image}</b></p>
                        <p>Name: <b>{data.product.name}</b></p>
                        <p>Code: <b>{data.product.code}</b></p>
                        <p>Price ($): <b>{data.product.price}</b></p>
                        <p>List price ($): <b>{data.product.list_price}</b></p>
                        <p>Quantity: <b>{data.product.quantity}</b></p>
                        <p>Created: <b>{new Date(data.product.created).toLocaleDateString()}</b></p>

                        <Divider/>

                        <h4>Product</h4>
                        <Table rowKey={"_id"} dataSource={data ? data.product.posts : []} loading={loading}>
                            <Table.Column dataIndex={"_id"} title={"ID"} />
                            <Table.Column dataIndex={"image"} title={"Image"} />
                            <Table.Column dataIndex={"name"} title={"Name"} />
                            <Table.Column dataIndex={"code"} title={"Code"} />
                            <Table.Column dataIndex={"price"} title={"Price"} />
                            <Table.Column dataIndex={"list_price"} title={"List Price"} />
                            <Table.Column dataIndex={"quantity"} title={"Quantity"} />
                            <Table.Column dataIndex={"created"} title={"Created"} render={v => new Date(v).toLocaleDateString()} />
                            <Table.Column dataIndex={"action"} title={""} render={(_, {_id}: any) => (
                                <Link to={`/product/${_id}`}><Icon type={"form"}/></Link>
                            )} />
                        </Table>
                    </>
                }}
            </Query>
        </>
    }
}
