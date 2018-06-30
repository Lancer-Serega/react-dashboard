import * as React from "react";
import {Layout} from "antd";
import MenuDashboard from './MenuDashboard';
import ContentDashboard from './ContentDashboard';
import {Router, navigate} from "@reach/router";

const {Header, Footer, Sider} = Layout;

export class App extends React.Component {
    public state = {
        collapsed: false
    };

    private onCollapse = (collapsed: boolean) => {
        this.setState({collapsed});
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

                    <MenuDashboard />
                </Sider>
                <Layout>
                    <Header style={{background: "#fff", padding: 0}}/>

                    <ContentDashboard />
                    <Footer style={{textAlign: "center"}}>
                        Ant Design ©2016 Created by Ant UED
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}
