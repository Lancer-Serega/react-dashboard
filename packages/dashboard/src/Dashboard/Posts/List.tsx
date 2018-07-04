import {Icon, Table} from "antd";
import gql from "graphql-tag";
import * as React from "react";
import {Query} from "react-apollo";
import {Link} from "../components/Link";
import {ListComponent} from "../components/ListComponent";
import {IListProps} from "../types/IDashboard";

const query = gql`
    query PostsQuery ($search: PostsSearchInput, $limit: ListLimit) {
        posts (search: $search, limit: $limit) {
            node {
                _id
                created
                text
                user {
                    _id
                    name
                }
            }
            count
            limit
            skip
        }
    }`;

export class List<P = {}> extends ListComponent {
    constructor (props: any) {
        super(props);
    }

    render() {
        return <>
            <h3>Posts List</h3>

            <Query query={query}
                   fetchPolicy="cache-and-network"
                   variables={this.getQueryVariables()}>
                {({loading, data}) => (
                    <Table rowKey={"_id"}
                           dataSource={!loading && data.posts.node || []}
                           pagination={this.getTablePagination(loading, () => data.posts)}
                           loading={loading}>
                        <Table.Column dataIndex={"_id"} title={"ID"}/>
                        <Table.Column dataIndex={"text"} title={"Text"} width={"50%"}/>
                        <Table.Column dataIndex={"user"}
                                      title={"User"}
                                      render={({_id, name}) => <Link to={`/users/${_id}`}>{name}</Link>}/>
                        <Table.Column dataIndex={"created"}
                                      title={"Created"}
                                      render={v => new Date(v).toLocaleDateString()}/>
                        <Table.Column dataIndex={"action"}
                                      render={(_, {_id}: any) => (
                                          <Link to={`/posts/${_id}`}><Icon type={"form"}/></Link>
                                      )}/>
                    </Table>
                )}
            </Query>
        </>
    }
}