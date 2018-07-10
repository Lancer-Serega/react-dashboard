import {Button, Col, DatePicker, Icon, Input, Divider, Row, Select, Table} from "antd";
import gql from "graphql-tag";
import * as React from "react";
import {Query} from "react-apollo";
import {Link} from "../components/Link";
import {ListComponent} from "../components/ListComponent";
import {css} from "emotion";

const query = gql`
    query OrdersQuery ($search: OrdersSearchInput, $limit: ListLimit) {
        orders (search: $search, limit: $limit) {
            node {
                _id
                numberDW
                numberAli
                created  # дата и время создания
                statusDW
                statusAli
                trackingNumber
                vendor
                cost
                buyer
                errorsNotes
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

export class List<P = {}> extends ListComponent {
    constructor (props: any) {
        super(props);
    }

    render() {
        const {Option} = Select;
        const {RangePicker} = DatePicker;

        return <>
            <h4>Filters</h4>

            <div className={filterStyle}>
                <Row type={"flex"} gutter={8}>
                    <Col span={8}>
                        <Select mode={"tags"}
                                style={{width: "100%"}}
                                value={this.state.search["_id"]}
                                onChange={(values) => this.handleFilterChange("_id", values)}
                                placeholder={"Product ids"}/>
                    </Col>
                    <Col span={8}>
                        <Select mode={"tags"}
                                style={{width: "100%"}}
                                value={this.state.search["idAli"]}
                                onChange={(values) => this.handleFilterChange("idAli", values)}
                                placeholder={"Search by ali IDs"}/>
                    </Col>
                    <Col span={8}>
                        <Input placeholder={"Search by title"}
                               style={{width: "100%"}}
                               value={this.state.search["title"]}
                               onChange={(e) => this.handleFilterChange("title", e.target.value)}/>
                    </Col>

                    <br/>
                    <br/>

                    <Col span={8}>
                        <Select
                            showSearch
                            mode="multiple"
                            style={{ width: '100%' }}
                            placeholder="Select a vendor"
                            optionFilterProp="children"
                            onChange={(selectedList) => this.handleFilterChange("vendor", selectedList)}
                        >
                            <Option value="v1">Vendor 1</Option>
                            <Option value="v2">Vendor 2</Option>
                            <Option value="v3">Vendor 3</Option>
                        </Select>
                    </Col>
                    <Col span={8}>
                        <Select
                            showSearch
                            mode="multiple"
                            style={{ width: '100%' }}
                            placeholder="Select a status"
                            optionFilterProp="children"
                            onChange={(selectedList) => this.handleFilterChange("status", selectedList)}
                        >
                            <Option value="active">Active</Option>
                            <Option value="hidden">Hidden</Option>
                            <Option value="disabled">Disabled</Option>
                        </Select>
                    </Col>
                    <Col span={8}>
                        <RangePicker format='YYYY-MM-DD'
                                     style={{width: "100%"}}
                                     value={this.state.search["created"]}
                                     onChange={(e: any) => this.handleFilterChange("created", e)}
                        />
                    </Col>
                </Row>

                <div className={"footer"}>
                    <Button onClick={this.handleResetState}>Reset</Button>
                </div>
            </div>

            <Divider/>

            <h3>Order List</h3>

            <Query query={query}
                   fetchPolicy="cache-and-network"
                   variables={this.getQueryVariables()}>
                {({loading, data}) => <>
                    <Table rowKey={"_id"}
                           className="list-product"
                           pagination={this.getTablePagination(loading, () => data.orders)}
                           dataSource={!loading && data.orders.node || []}
                           loading={loading}>
                        <Table.Column width="5%" dataIndex={"_id"} title={"ID"}/>
                        <Table.Column width="10%" dataIndex={"numberDW"} title={"Number DW"}/>
                        <Table.Column width="10%" dataIndex={"numberAli"} title={"Number Ali"}/>
                        <Table.Column width="10%" dataIndex={"created"} title={"Created"}
                                      render={v => new Date(v).toLocaleDateString()}/>
                        <Table.Column width="10%" dataIndex={"statusDW"} title={"Status DW"}/>
                        <Table.Column width="8%" dataIndex={"statusAli"} title={"Status Ali"}/>
                        <Table.Column width="8%" dataIndex={"trackingNumber"} title={"Track number"}
                                      render={(t) => t.toUpperCase()}/>
                        <Table.Column width="10%" dataIndex={"vendor"} title={"Vendor"}/>
                        <Table.Column width="8%" dataIndex={"cost"} title={"Cost"}/>
                        <Table.Column width="10%" dataIndex={"buyer"} title={"Buyer"}/>
                        <Table.Column width="10%" dataIndex={"errorsNotes"} title={"Error, Notes"}/>
                        <Table.Column width="1%" dataIndex={"action"} title={""} render={(_, {_id}: any) => (
                            <Link to={`/order/${_id}`}><Icon type={"form"}/></Link>
                        )}/>
                    </Table>
                </>}
            </Query>
        </>
    }
}