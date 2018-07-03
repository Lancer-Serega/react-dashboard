import * as React from "react";
import {observable} from "mobx";
import {observer} from "mobx-react";
import {DynamicRoute} from "../../routes";
import {Route} from "../../types/Route";
import {RouteComponent} from "./RouteComponent";

@observer
export class LazyRoute extends RouteComponent<{ route: Route, mapping: DynamicRoute }> {
    @observable
    protected component: any = this.props.mapping.get(this.props.route.id, this.props.route.module);

    async componentDidMount() {
        if (!this.component) {
            const {id, module} = this.props.route;
            this.component = await this.props.mapping.resolve(id, module);
        }
    }

    render() {
        if (this.component) {
            const COM = this.component;
            return <COM {...this.props} />
        }

        return <p>Loading {this.props.route.module}...</p>;
    }
}
