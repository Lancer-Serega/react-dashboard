import {navigate, Router} from "@reach/router";
import {Breadcrumb, Icon, Layout, Menu} from "antd";
import {ClickParam} from "antd/lib/menu";
import {observable} from "mobx";
import {observer} from "mobx-react";
import * as React from "react";
import {DynamicRoute} from "../routes";
import {LocalState} from "../stores/LocalState";
import {SearchStore} from "../stores/SearchStore";
import {Route} from "../types/Route";
import {HeaderMenu} from "./components/HeaderMenu";
import {LazyRoute} from "./components/LazyRoute";
import {Link} from "./components/Link";
import {NotFound} from "./components/NotFound";
import {Dashboard} from "./Dashboard/Dashboard";

const {Header, Content, Footer, Sider} = Layout;
const SubMenu = Menu.SubMenu;

type Props = {
    state: LocalState;
    search: SearchStore;
    path: string;
    routes: Route[];
    mapping: DynamicRoute;
}

@observer
export class App extends React.Component<Props> {
    @observable
    private collapsed = this.props.state.collapsed;

    @observable
    private path = this.props.path;

    // handle menu navigation
    private handleNavigate = (selected: ClickParam) => {
        navigate(`${selected.key}`);
    };

    // static binding
    private handleSiderCollapse = (collapsed: boolean) => {
        this.props.state.save({collapsed});
    };

    componentDidUpdate() {
        // Catch update location changes and reset search
        if (this.props.path !== this.path) {
            this.props.search.reset(() => {
                // update in one transaction for performance reason
                this.path = this.props.path;
            });
        }
    }

    public render() {
        const {collapsed} = this.props.state;

        return (
            <Layout style={{minHeight: "100vh"}}>
                <Sider
                    collapsible={true}
                    collapsed={collapsed}
                    onCollapse={this.handleSiderCollapse}
                >
                    <div className="logo">
                        <Link to={"/"}>Main</Link>
                    </div>
                    <Menu theme="dark" onSelect={this.handleNavigate} mode="inline">
                        <SubMenu
                            key="users"
                            title={<span><Icon type="user" /><span>Users</span></span>}
                        >
                            <Menu.Item key="/users">List</Menu.Item>
                        </SubMenu>
                        <SubMenu
                            key="posts"
                            title={<span><Icon type="file-text" /><span>Posts</span></span>}
                        >
                            <Menu.Item key="/posts">List</Menu.Item>
                        </SubMenu>
                        {/*<SubMenu*/}
                            {/*key="orders"*/}
                            {/*title={<span><Icon type="solution" /><span>Order</span></span>}*/}
                        {/*>*/}
                            {/*<Menu.Item key="/orders">List</Menu.Item>*/}
                        {/*</SubMenu>*/}
                        <SubMenu
                            key="products"
                            title={<span><Icon type="tablet" /><span>Product</span></span>}
                        >
                            <Menu.Item key="/products">List</Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{background: "#fff", padding: 0}}>
                        <HeaderMenu search={this.props.search}/>
                    </Header>
                    <Content style={{margin: "0 16px"}}>
                        <Breadcrumb style={{margin: "16px 0"}}>
                            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                        </Breadcrumb>
                        <div style={{padding: 24, background: "#fff", minHeight: 360}}>
                            <Router>
                                {/**/}
                                <Dashboard search={this.props.search} path={"/"}/>
                                {this.props.routes.map(route => (
                                    <LazyRoute key={route.id}
                                               path={route.path}
                                               mapping={this.props.mapping}
                                               route={route}/>
                                ))}
                                <NotFound default/>
                            </Router>
                        </div>
                    </Content>
                    <Footer style={{textAlign: "center"}}>
                        Copyright
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}
