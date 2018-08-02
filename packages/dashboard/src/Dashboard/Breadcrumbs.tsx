import * as React from "react";
import {Breadcrumb} from 'antd';
import {Link} from "./components/Link";
import {IBreadcrumbsProps} from './types/IDashboard';

class BreadcrumbsDashboard extends React.Component<IBreadcrumbsProps> {
    constructor(props: IBreadcrumbsProps) {
        super(props);
    }

    public render() {
        const breadcrumbNameMap = {
            '/': 'Home',
            '/users': 'Users',
            '/posts': 'Posts',
            '/orders': 'Orders',
            '/products': 'Products',
        };

        const {location} = this.props;
        const pathSnippets = location.pathname.split('/').filter((i: string) => i);

        const extraBreadcrumbItems = pathSnippets.map((_: string, index: number) => {
            const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
            return (
                <Breadcrumb.Item key={url}>
                    <Link to={url}>
                        {breadcrumbNameMap[url]}
                    </Link>
                </Breadcrumb.Item>
            );
        });

        return (
            <Breadcrumb style={{margin: "16px 0"}}>
                {
                    [(<Breadcrumb.Item key="home">
                        <Link to="/">Home</Link>
                    </Breadcrumb.Item>)].concat(extraBreadcrumbItems)
                }

                {/*<Breadcrumb.Item> / </Breadcrumb.Item>*/}
            </Breadcrumb>
        )
    }
}

export default BreadcrumbsDashboard;