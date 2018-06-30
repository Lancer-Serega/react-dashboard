import React, {Component} from 'react';
import {Icon, Menu as BaseMenu} from "antd";
import {Link} from "react-router-dom";

class sMenu extends Component {

    constructor (props: any) {
        super(props);
    }

    public handleToUpdate: any;

    public handleToUpdate = (handle) => {
        this.props.handleToUpdate
    };

    public handleClick = (e:any) => {
        // history.push(e.key);
    };

    public getMenuItems () {
        return [
            {
                url: '/',
                name: 'Home Page',
                icon: 'home'
            },
            {
                url: '/dashboard',
                name: 'Dashboard Home',
                icon: ''
            },
            {
                url: '/dashboard/users',
                name: 'User List',
                icon: 'user'
            },
            {
                url: '/dashboard/settings',
                name: 'Settings',
                icon: 'setting'
            },
        ];
    }
    
    public render () {
        const SubMenu = BaseMenu.SubMenu;

        return (
            <BaseMenu theme="dark" defaultSelectedKeys={["users"]} mode="inline" onSelect={this.handleClick}>

                <BaseMenu.Item key="/">
                    <Link to="/">
                        <Icon type="home"/>
                        <span>Home Page</span>
                    </Link>
                </BaseMenu.Item>

                <SubMenu key="dashboard-submenu" title={<span><Icon type="dashboard"/><span>Dashboard</span></span>}>
                    <BaseMenu.Item key="/dashboard">
                        <Link to="/dashboard">
                            <Icon type="home"/>
                            <span>Dashboard Home</span>
                        </Link>
                    </BaseMenu.Item>

                    <BaseMenu.Item key="/dashboard/users">
                        <Link to="/dashboard/users">
                            <Icon type="user"/>
                            <span>User List</span>
                        </Link>
                    </BaseMenu.Item>

                    <BaseMenu.Item key="/dashboard/settings">
                        <Link to="/dashboard/settings">
                            <Icon type="setting"/>
                            <span>Settings</span>
                        </Link>
                    </BaseMenu.Item>
                </SubMenu>
            </BaseMenu>
        )
    }
}

export default Menu;