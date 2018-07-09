import {Button, Col, DatePicker, Divider, Icon, Input, Row, Select, Table} from "antd";
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
                image
                title
                idAli
                status
                price
                listPrice
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
    private static preparePrice (price: number) {
        return (Math.trunc(price * 100) / 100).toFixed(2);
    }

    private static prepareStatus (status: string) {
        return <span className={`color-status-${status}`}>{status}</span>;
    }

    render() {
        const {Option} = Select;
        const { RangePicker } = DatePicker;

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

            <h3>Products List</h3>

            <Query query={query}
                   fetchPolicy="cache-and-network"
                   variables={this.getQueryVariables()}>
                {({loading, data}) => <>
                    <Table rowKey={"_id"}
                           className="list-product"
                           pagination={this.getTablePagination(loading, () => data.products)}
                           dataSource={!loading && data.products.node || []}
                           loading={loading}>
                        <Table.Column dataIndex={"image"} title={"Image"} render={(src: string) => (<img src={src} />)}/>
                        <Table.Column dataIndex={"_id"} title={"ID"}/>
                        <Table.Column dataIndex={"idAli"} title={"ID ali"} />
                        <Table.Column dataIndex={"name"} title={"Name"} />
                        <Table.Column dataIndex={"status"} title={"Status"} render={(s) => List.prepareStatus(s)} />
                        <Table.Column dataIndex={"price"} title={"Price ($)"} className="price" render={(p) => List.preparePrice(p)} />
                        <Table.Column dataIndex={"listPrice"} title={"List Price ($)"} className="price" render={(p) => List.preparePrice(p)} />
                        <Table.Column dataIndex={"quantity"} title={"Quantity"} />
                        <Table.Column dataIndex={"created"} title={"Created"} render={v => new Date(v).toLocaleDateString()}/>
                        <Table.Column dataIndex={"action"} title={""} render={(_, {_id}: any) => (
                            <Link to={`/products/${_id}`}><Icon type={"form"}/></Link>
                        )}/>
                    </Table>
                </>}
            </Query>
        </>
    }
}