import {Button, Col, Divider, Icon, Input, Row, Select, Table} from "antd";
import gql from "graphql-tag";
import * as React from "react";
import {Query} from "react-apollo";
import {ListComponent} from "../components/ListComponent";
import {css} from "emotion";
import {Link} from "../components/Link";

const query = gql`
    query ProductsQuery ($search: ProductsSearchInput, $limit: ListLimit) {
        products (search: $search, limit: $limit) {
            node {
                _id
                name
                code
                price
                list_price
                quantity
                created
            }
            count
            limit
            skip
        }
    }`;

const filterStyle = css`
    .footer {
        text-align: right;
        margin-top: 16px;
    }
`;

export class List<P = {}> extends ListComponent<P> {
    render() {
        return <>
            <h4>Filters</h4>

            <div className={filterStyle}>
                <Row type={"flex"} gutter={8}>
                    <Col span={12}>
                        <Select mode={"tags"}
                                style={{width: "100%"}}
                                value={this.state.search["_id"]}
                                onChange={(values) => this.handleFilterChange("_id", values)}
                                placeholder={"Product ids"}/>
                    </Col>
                    <Col span={6}>
                        <Input placeholder={"Search by name"}
                               autoComplete={"off"}
                               value={this.state.search["name"]}
                               onChange={(e) => this.handleFilterChange("name", e.target.value)}/>
                    </Col>
                </Row>

                <div className={"footer"}>
                    <Button onClick={this.handleResetState}>Reset</Button>
                </div>
            </div>
            <Divider/>

            <h3>Products List</h3>

            <Query query={query}
                   fetchPolicy="cache-and-network"
                   variables={this.getQueryVariables()}>
                {({loading, data}) => <>
                    <Table rowKey={"_id"}
                           pagination={this.getTablePagination(loading, () => data.products)}
                           dataSource={!loading && data.products.node || []}
                           loading={loading}>
                        <Table.Column dataIndex={"_id"} title={"ID"}/>
                        {/*<Table.Column dataIndex={"image"} title={"Image"} />*/}
                        <Table.Column dataIndex={"name"} title={"Name"} />
                        <Table.Column dataIndex={"code"} title={"Code"} />
                        <Table.Column dataIndex={"price"} title={"Price"} />
                        <Table.Column dataIndex={"list_price"} title={"List Price"} />
                        <Table.Column dataIndex={"quantity"} title={"Quantity"} />
                        <Table.Column dataIndex={"created"} title={"Created"} render={v => new Date(v).toLocaleDateString()}/>
                        {/*<Table.Column dataIndex={"action"} title={""} render={(_, {_id}: any) => (*/}
                            {/*<Link to={`/product/${_id}`}><Icon type={"form"}/></Link>*/}
                        {/*)}/>*/}
                    </Table>
                </>}
            </Query>
        </>
    }
}