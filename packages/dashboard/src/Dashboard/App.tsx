import * as React from "react";
import {Icon, Layout, Menu} from "antd";
import {Form as PostForm} from "./Posts/Form";
import {List as PostsList} from "./Posts/List";
import {Form as UserForm} from "./Users/Form";
import {List as UsersList} from "./Users/List";
import {Router, navigate} from "@reach/router";
import {SelectParam} from "antd/lib/menu";

const {Header, Content, Footer, Sider} = Layout;
const SubMenu = Menu.SubMenu;

export class App extends React.Component {
    public state = {
        collapsed: false
    };

    private onCollapse = (collapsed: boolean) => {
        this.setState({collapsed});
    };

    private handleNavigate = (selected: SelectParam) => {
        navigate(`${selected.keyPath}`);
    };

    public render() {
        return (
            <Layout style={{minHeight: "100vh"}}>
                <Sider
                    collapsible={true}
                    collapsed={this.state.collapsed}
                    onCollapse={this.onCollapse}
                >
                    <div className="logo"/>
                    <Menu theme="dark" onSelect={this.handleNavigate} mode="inline">
                        <SubMenu
                            key="users"
                            title={<span><Icon type="user"/><span>Users</span></span>}
                        >
                            <Menu.Item key="/users">List</Menu.Item>
                        </SubMenu>
                        <SubMenu
                            key="posts"
                            title={<span><Icon type="file-text"/><span>Posts</span></span>}
                        >
                            <Menu.Item key="/posts">List</Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{background: "#fff", padding: 0}}/>
                    <Content style={{margin: "0 16px"}}>
                        {/*<Breadcrumb style={{margin: "16px 0"}}>
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Bill</Breadcrumb.Item>
                        </Breadcrumb>*/}
                        <div style={{padding: 24, background: "#fff", minHeight: 360}}>
                            <Router>
                                <UsersList path={"/users"}/>
                                <UserForm path={"/users/:id"}/>
                                <PostsList path={"/posts"}/>
                                <PostForm path={"/posts/:id"}/>
                            </Router>
                        </div>
                    </Content>
                    <Footer style={{textAlign: "center"}}>
                        Ant Design ©2016 Created by Ant UED
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}
