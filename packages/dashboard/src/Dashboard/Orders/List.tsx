import {Button, Col, DatePicker, Icon, Input, Divider, Row, Select, Table, Slider, Collapse} from "antd";
import gql from "graphql-tag";
import * as React from "react";
import {Query} from "react-apollo";
import {Link} from "../components/Link";
import {ListComponent} from "../components/ListComponent";
import {css} from "emotion";

const query = gql`
    query OrderListQuery ($search: OrdersSearchInput, $limit: ListLimit) {
        orderList (search: $search, limit: $limit) {
            node {
                _id
                numberDW
                numberAli
                created
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

    private static prepareStatusAli (status: string) {
        return <span className={`color-status-${status.toLowerCase()}`}>{status}</span>
    }

    private static prepareStatusDW (status: string) {
        return <span className={`color-status-${status.toLowerCase()}`}>{status}</span>
    }

    private static preparePrice (price: number) {
        return (Math.trunc(price * 100) / 100).toFixed(2);
    }

    render() {
        const {Option} = Select;
        const {RangePicker} = DatePicker;
        const {Panel} = Collapse;

        return <>
            <Collapse>
                <Panel header="Filters orders" key="filter-order">
                    <div className={filterStyle}>
                        <Row type={"flex"} gutter={8}>
                            <Col span={8}>
                                <Select mode={"tags"}
                                        style={{width: "100%"}}
                                        value={this.state.search["_id"]}
                                        onChange={(values) => this.handleFilterChange("_id", values)}
                                        placeholder={"Orders ids"}/>
                            </Col>
                            <Col span={8}>
                                <Select mode={"tags"}
                                        style={{width: "100%"}}
                                        value={this.state.search["productTitle"]}
                                        onChange={(values) => this.handleFilterChange("productTitle", values)}
                                        placeholder={"Product title"}/>
                            </Col>
                            <Col span={8}>
                                <Select mode={"tags"}
                                        style={{width: "100%"}}
                                        value={this.state.search["trackingNumber"]}
                                        onChange={(values) => this.handleFilterChange("trackingNumber", values)}
                                        placeholder={"Tracking Number"}/>
                            </Col>

                            <br /><br />

                            <Col span={8}>
                                <Select mode={"tags"}
                                        style={{width: "100%"}}
                                        value={this.state.search["productId"]}
                                        onChange={(values) => this.handleFilterChange("productId", values)}
                                        placeholder={"Product ids"}/>
                            </Col>
                            <Col span={8}>
                                <RangePicker showTime
                                             format="YYYY/MM/DD HH:mm:ss"
                                             style={{width: "100%"}}
                                             value={this.state.search["createdDate"]}
                                             onChange={(e: any) => this.handleFilterChange("createdDate", e)}
                                />
                            </Col>

                            <Col span={8}>
                                <Slider range
                                        defaultValue={this.state.search["price"] || [0, 1000]}
                                        onChange={(value) => this.handleFilterChange("price", value)}
                                />
                            </Col>

                            <br /><br />

                            <Col span={8}>
                                <Select mode={"tags"}
                                        style={{width: "100%"}}
                                        value={this.state.search["customerId"]}
                                        onChange={(values) => this.handleFilterChange("customerId", values)}
                                        placeholder={"Customer Ids"}/>
                            </Col>
                            <Col span={8}>
                                <Select mode={"tags"}
                                        style={{width: "100%"}}
                                        value={this.state.search["customerName"]}
                                        onChange={(values) => this.handleFilterChange("customerName", values)}
                                        placeholder={"Customer Name"}/>
                            </Col>
                            <Col span={8}>
                                <Select mode={"tags"}
                                        style={{width: "100%"}}
                                        value={this.state.search["customerAddress"]}
                                        onChange={(values) => this.handleFilterChange("customerAddress", values)}
                                        placeholder={"Customer Address"}/>
                            </Col>

                            <br /><br />

                            <Col span={6}>
                                <Select mode={"tags"}
                                        style={{width: "100%"}}
                                        value={this.state.search["buyerId"]}
                                        onChange={(values) => this.handleFilterChange("buyerId", values)}
                                        placeholder={"Buyer Ids"}/>
                            </Col>
                            <Col span={6}>
                                <Select mode={"tags"}
                                        style={{width: "100%"}}
                                        value={this.state.search["buyerEmail"]}
                                        onChange={(values) => this.handleFilterChange("buyerEmail", values)}
                                        placeholder={"Buyer Email"}/>
                            </Col>
                            <Col span={6}>
                                <Select mode={"tags"}
                                        style={{width: "100%"}}
                                        value={this.state.search["buyerName"]}
                                        onChange={(values) => this.handleFilterChange("buyerName", values)}
                                        placeholder={"Buyer Name"}/>
                            </Col>
                            <Col span={6}>
                                <Select mode={"tags"}
                                        style={{width: "100%"}}
                                        value={this.state.search["buyerAddress"]}
                                        onChange={(values) => this.handleFilterChange("buyerAddress", values)}
                                        placeholder={"Buyer Address"}/>
                            </Col>

                            <br /><br />

                            <Col span={6}>
                                <Select mode={"tags"}
                                        style={{width: "100%"}}
                                        value={this.state.search["vendorId"]}
                                        onChange={(values) => this.handleFilterChange("vendorId", values)}
                                        placeholder={"Vendor Ids"}/>
                            </Col>
                            <Col span={6}>
                                <Select mode={"tags"}
                                        style={{width: "100%"}}
                                        value={this.state.search["vendorName"]}
                                        onChange={(values) => this.handleFilterChange("vendorName", values)}
                                        placeholder={"Vendor Name"}/>
                            </Col>
                            <Col span={6}>
                                <Select mode={"tags"}
                                        style={{width: "100%"}}
                                        value={this.state.search["vendorStatus"]}
                                        onChange={(values) => this.handleFilterChange("vendorStatus", values)}
                                        placeholder={"Vendor Status"}>
                                    <Option value={"processed"}>Processed</Option>
                                    <Option value={"shipped"}>Shipped</Option>
                                    <Option value={"created"}>Created</Option>
                                    <Option value={"failed"}>Failed</Option>
                                </Select>
                            </Col>
                            <Col span={6}>
                                <Select mode={"tags"}
                                        style={{width: "100%"}}
                                        value={this.state.search["vendorNumber"]}
                                        onChange={(values) => this.handleFilterChange("vendorNumber", values)}
                                        placeholder={"Vendor Number"}/>
                            </Col>

                            <br /><br />

                            <Col span={6}>
                                <Select mode={"tags"}
                                        style={{width: "100%"}}
                                        value={this.state.search["dwStatus"]}
                                        onChange={(values) => this.handleFilterChange("dwStatus", values)}
                                        placeholder={"Dropwow Status"}>
                                    <Option value="processed">Processed</Option>
                                    <Option value="completed">Completed</Option>
                                    <Option value="open">Open</Option>
                                    <Option value="failed">Failed</Option>
                                    <Option value="canceled">Canceled</Option>
                                    <Option value="backordered">Backordered</Option>
                                </Select>
                            </Col>
                            <Col span={6}>
                                <Select mode={"tags"}
                                        style={{width: "100%"}}
                                        value={this.state.search["dwNumber"]}
                                        onChange={(values) => this.handleFilterChange("dwNumber", values)}
                                        placeholder={"Dropwow Number"}/>
                            </Col>
                            <Col span={6}>
                                <Select mode={"tags"}
                                        style={{width: "100%"}}
                                        value={this.state.search["shippingMethod"]}
                                        onChange={(values) => this.handleFilterChange("shippingMethod", values)}
                                        placeholder={"Shipping Method"}/>
                            </Col>
                            <Col span={6}>
                                <Select mode={"tags"}
                                        style={{width: "100%"}}
                                        value={this.state.search["shippingCountry"]}
                                        onChange={(values) => this.handleFilterChange("shippingCountry", values)}
                                        placeholder={"Shipping Country"}/>
                            </Col>

                        </Row>

                        <div className={"footer"}>
                            <Button onClick={this.handleResetState}>Reset</Button>
                        </div>
                    </div>
                </Panel>
            </Collapse>

            <Divider/>

            <h3>Order List</h3>

            <Query query={query}
                   fetchPolicy="cache-and-network"
                   variables={this.getQueryVariables()}>
                {({loading, data}) => <div className="table list-order">
                    <Table rowKey={"_id"}
                           pagination={this.getTablePagination(loading, () => data.orderList)}
                           dataSource={!loading && data.orderList.node || []}
                           loading={loading}>
                        <Table.Column width="5%" dataIndex={"_id"} title={"ID"}/>
                        <Table.Column width="7%" dataIndex={"numberDW"} title={"Number DW"}/>
                        <Table.Column width="7%" dataIndex={"numberAli"} title={"Number Ali"}/>
                        <Table.Column width="7%" dataIndex={"created"} title={"Created"}
                                      render={v => new Date(v).toLocaleDateString()}/>
                        <Table.Column width="7%" dataIndex={"statusDW"} title={"Status DW"} render={(s) => List.prepareStatusDW(s)}/>
                        <Table.Column width="7%" dataIndex={"statusAli"} title={"Status Ali"} render={(s) => List.prepareStatusAli(s)}/>
                        <Table.Column width="13%" dataIndex={"trackingNumber"} title={"Track number"}
                                      render={(t) => t.join(', ').toUpperCase()}/>
                        <Table.Column width="13%" dataIndex={"vendor"} title={"Vendor"}/>
                        <Table.Column width="7%" dataIndex={"cost"} title={"Cost"} render={(p) => List.preparePrice(p)}/>
                        <Table.Column width="13%" dataIndex={"buyer"} title={"Buyer"}/>
                        <Table.Column width="13%" dataIndex={"errorsNotes"} title={"Error, Notes"}/>
                        <Table.Column width="1%" dataIndex={"action"} title={""} render={(_, {_id}: any) => (
                            <Link to={`/orders/${_id}`}><Icon type={"form"}/></Link>
                        )}/>
                    </Table>
                </div>}
            </Query>
        </>
    }
}