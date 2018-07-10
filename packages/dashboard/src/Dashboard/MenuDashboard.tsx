import * as React from "react";
import {Icon, Menu} from "antd";
import {SelectParam} from "antd/lib/menu";
import {navigate} from "@reach/router";

class MenuDashboard extends React.Component {

    private handleNavigate = (selected: SelectParam) => {
        navigate(`${selected.keyPath}`);
    };

    public render() {
        const SubMenu = Menu.SubMenu;

        return (
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
                <SubMenu
                    key="orders"
                    title={<span><Icon type="solution" /><span>Order</span></span>}
                >
                    <Menu.Item key="/orders">List</Menu.Item>
                </SubMenu>
                <SubMenu
                    key="products"
                    title={<span><Icon type="tablet" /><span>Product</span></span>}
                >
                    <Menu.Item key="/products">List</Menu.Item>
                </SubMenu>
            </Menu>
        )
    }
}

export default MenuDashboard;