import {Spin} from "antd";
import gql from "graphql-tag";
import * as React from "react";
import {Query} from "react-apollo";
import {Link} from "../components/Link";
import {RouteComponent} from "../components/RouteComponent";

const query = gql`
    query PostQuery($_id: Int!) {
        post(_id: $_id) {
            _id
            text
            created
            user {
                _id
                name
            }
        }
    }
`;

export class Form extends RouteComponent<{ id?: string }> {
    render() {
        return <>
            <h3>Post {this.props.id}</h3>
            <Query query={query} variables={{_id: this.props.id}}>
                {({loading, data, error}) => {
                    if (loading) {
                        return <Spin/>
                    }

                    if (error) return <p>{error}</p>;

                    if (!data) {
                        return <h3>Not found</h3>
                    }

                    const {post} = data;
                    const {user} = post;

                    return <div>
                        <p>ID: <b>{post._id}</b></p>
                        <p>User: <Link to={`/users/${user._id}`}>{user.name}</Link></p>
                        <p>Text: <b>{post.text}</b></p>
                        <p>Created: <b>{new Date(post.created).toLocaleDateString()}</b></p>
                    </div>
                }}
            </Query>
        </>
    }
}