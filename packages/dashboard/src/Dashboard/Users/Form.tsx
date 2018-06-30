import {Divider, Icon, Spin, Table} from "antd";
import gql from "graphql-tag";
import * as React from "react";
import {Query} from "react-apollo";
import {Link} from "../components/Link";

const query = gql`
    query user($_id: Int!) {
        user(_id: $_id) {
            _id
            name
            email
            password
            created
            stats {
                posts
            }
            posts {
                _id
                created
                text
            }
        }
    }
`;

export class Form extends React.Component<{ id?: string }> {
    render() {
        return <>
            <h3>User {this.props.id}</h3>
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

                        <p>ID: <b>{data.user._id}</b></p>
                        <p>Name: <b>{data.user.name}</b></p>
                        <p>Email: <b>{data.user.email}</b></p>
                        <p>Posts: <b>{data.user.stats.posts}</b></p>
                        <p>Created: <b>{new Date(data.user.created).toLocaleDateString()}</b></p>

                        <Divider/>

                        <h4>Posts</h4>
                        <Table rowKey={"_id"} dataSource={data ? data.user.posts : []} loading={loading}>
                            <Table.Column dataIndex={"_id"} title={"ID"} />
                            <Table.Column dataIndex={"text"} title={"Text"} width={"50%"} />
                            <Table.Column dataIndex={"created"} title={"Created"} render={v => new Date(v).toLocaleDateString()} />
                            <Table.Column dataIndex={"action"} title={""} render={(_, {_id}: any) => (
                                <Link to={`/posts/${_id}`}><Icon type={"form"}/></Link>
                            )} />
                        </Table>
                    </>
                }}
            </Query>
        </>
    }
}