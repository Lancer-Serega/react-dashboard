import {Icon, Table} from "antd";
import gql from "graphql-tag";
import * as React from "react";
import {Query} from "react-apollo";
import {Link} from "../components/Link";
import {ListComponent} from "../components/ListComponent";
import {IListProps} from "../types/IDashboard";

const query = gql`{
    product {
        _id
        image
        name
        code
        price
        list_price
        quantity
        created
    }
}`;

export class List extends ListComponent {
    constructor (props: IListProps) {
        super(props);

        const Content = props.Content;
        Content.setState({location: location});
    }

    render() {
        return <>
            <h3>Posts List</h3>

            <Query query={query}>
                {({loading, data}) => (
                    <Table rowKey={"_id"} dataSource={data ? data.users : []} loading={loading}>
                        <Table.Column dataIndex={"_id"} title={"ID"}/>
                        <Table.Column dataIndex={"image"} title={"Image"} />
                        <Table.Column dataIndex={"name"} title={"Name"} />
                        <Table.Column dataIndex={"code"} title={"Code"} />
                        <Table.Column dataIndex={"price"} title={"Price"} />
                        <Table.Column dataIndex={"list_price"} title={"List Price"} />
                        <Table.Column dataIndex={"quantity"} title={"Quantity"} />
                        <Table.Column dataIndex={"created"} title={"Created"} render={v => new Date(v).toLocaleDateString()}/>
                        <Table.Column dataIndex={"action"} title={""} render={(_, {_id}: any) => (
                            <Link to={`/product/${_id}`}><Icon type={"form"}/></Link>
                        )}/>
                    </Table>
                )}
            </Query>
        </>
    }
}