import {Icon, Table} from "antd";
import gql from "graphql-tag";
import * as React from "react";
import {Query} from "react-apollo";
import {Link} from "../components/Link";
import {ListComponent} from "../components/ListComponent";
import {IListProps} from "../types/IDashboard";

const query = gql`{
    order {
        _id
        status
        customer
        wallet
        overdue
        tracking
        vendor_status
        total
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
            <h3>Order List</h3>

            <Query query={query}>
                {({loading, data}) => (
                    <Table rowKey={"_id"} dataSource={data ? data.users : []} loading={loading}>
                        <Table.Column dataIndex={"_id"} title={"ID"}/>
                        <Table.Column dataIndex={"status"} title={"Status"}/>
                        <Table.Column dataIndex={"customer"} title={"Customer"}/>
                        <Table.Column dataIndex={"wallet"} title={"Wallet"}/>
                        <Table.Column dataIndex={"overdue"} title={"Overdue"}/>
                        <Table.Column dataIndex={"tracking"} title={"Tracking"}/>
                        <Table.Column dataIndex={"vendor_status"} title={"Vendor status"}/>
                        <Table.Column dataIndex={"total"} title={"Total"}/>
                        <Table.Column dataIndex={"created"} title={"Created"}
                                      render={v => new Date(v).toLocaleDateString()}/>
                        <Table.Column dataIndex={"action"} title={""} render={(_, {_id}: any) => (
                            <Link to={`/users/${_id}`}><Icon type={"form"}/></Link>
                        )}/>
                    </Table>
                )}
            </Query>
        </>
    }
}