import * as React from "react";
import {Tabs} from "antd";
import Information from "./TabsPane/Information";
import OptionsSettings from "./TabsPane/OptionsSettings";
import PricingInventory from "./TabsPane/PricingInventory";
import Availability from "./TabsPane/Availability";
import Extra from "./TabsPane/Extra";

class General extends React.Component<{productId: number}> {
    public render() {
        const {TabPane} = Tabs;

        return <div>
            <Tabs defaultActiveKey="information" type="card">
                <TabPane tab="Information" key="information">
                    <Information productId={this.props.productId} />
                </TabPane>

                <TabPane tab="Options settings" key="options_settings">
                    <OptionsSettings productId={this.props.productId} />
                </TabPane>

                <TabPane tab="Pricing / inventory" key="pricing_inventory">
                    <PricingInventory productId={this.props.productId} />
                </TabPane>

                <TabPane tab="Availability" key="availability">
                    <Availability productId={this.props.productId} />
                </TabPane>

                <TabPane tab="Extra" key="extra">
                    <Extra productId={this.props.productId} />
                </TabPane>
            </Tabs>
        </div>
    }
}

export default General;