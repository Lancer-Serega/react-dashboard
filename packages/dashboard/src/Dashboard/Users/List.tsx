import {Button, Col, Divider, Icon, Input, Row, Select, Table} from "antd";
import gql from "graphql-tag";
import * as React from "react";
import {Query} from "react-apollo";
import {Link} from "../components/Link";
import {ListComponent} from "../components/ListComponent";
import {css} from "emotion";

const query = gql`
    query UsersQuery ($search: UsersSearchInput, $limit: ListLimit) {
        users (search: $search, limit: $limit) {
            node {
                _id
                name
                email
                created
                stats {
                    posts
                }
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
                                placeholder={"User ids"}/>
                    </Col>
                    <Col span={6}>
                        <Input placeholder={"Search by name"}
                               autoComplete={"off"}
                               value={this.state.search["name"]}
                               onChange={(e) => this.handleFilterChange("name", e.target.value)}/>
                    </Col>
                    <Col span={6}>
                        <Input placeholder={"Search by email"}
                               type="email"
                               autoComplete={"off"}
                               value={this.state.search["email"]}
                               onChange={(e) => this.handleFilterChange("email", e.target.value)}/>
                    </Col>
                </Row>

                <div className={"footer"}>
                    <Button onClick={this.handleResetState}>Reset</Button>
                </div>
            </div>
            <Divider/>

            <h3>Users List</h3>

            <Query query={query}
                   fetchPolicy="cache-and-network"
                   variables={this.getQueryVariables()}>
                {({loading, data}) => <>
                    <Table rowKey={"_id"}
                           pagination={this.getTablePagination(loading, () => data.users)}
                           dataSource={!loading && data.users.node || []}
                           loading={loading}>
                        <Table.Column dataIndex={"_id"} title={"ID"}/>
                        <Table.Column dataIndex={"name"} title={"Name"}/>
                        <Table.Column dataIndex={"email"} title={"Email"}/>
                        <Table.Column dataIndex={"stats.posts"} title={"Posts"}/>
                        <Table.Column dataIndex={"created"} title={"Created"}
                                      render={v => new Date(v).toLocaleDateString()}/>
                        <Table.Column dataIndex={"action"} title={""} render={(_, {_id}: any) => (
                            <Link to={`/users/${_id}`}><Icon type={"form"}/></Link>
                        )}/>
                    </Table>
                </>}
            </Query>
        </>
    }
}