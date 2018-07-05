import * as React from "react";
import {Tooltip, Icon, Spin, Input, Select, Checkbox} from "antd";
import gql from "graphql-tag";
import {Query} from "react-apollo";

const query = gql`
    query ProductPricingInventoryQuery($_id: Int!) {
        productPricingInventory(_id: $_id) {
            _id
            code
            listPrice
            inStock
            zeroPriceAction
            inventory
            orderQuantityMin
            orderQuantityMax
            quantityStep
            listQuantityCount
            vat
        }
    }
`;

class PricingInventory extends React.Component<{productId: number}> {
    public render() {
        const {Option} = Select;

        return (
            <Query query={query} variables={{_id: this.props.productId}}>
                {({loading, data, error}) => {
                    if (loading) {
                        return <Spin />
                    }

                    if (error) return <p>{error}</p>;

                    if (!data) {
                        return <h3>Product Not found</h3>
                    }

                    const product = data.productPricingInventory;

                    return (
                        <div className="form-inputs" data-name="pricing-inventory">
                            <div>
                                <label>CODE: {'\u00A0'}
                                    <Input placeholder="Input product code" value={product.code} />
                                </label>
                            </div>

                            <div>
                                <label>List price ($): {'\u00A0'}
                                    <Tooltip placement="topLeft" title={"Manufacturer suggested retail price."}>
                                        <Icon type="question-circle" />
                                    </Tooltip>{'\u00A0'}
                                    <Input placeholder="Input list price" type="number" step="0.01" value={product.listPrice} />
                                </label>
                            </div>

                            <div>
                                <label>In stock: {'\u00A0'}
                                    <Input placeholder="Input in stock" type="number" step="1" value={product.inStock} />
                                </label>
                            </div>

                            <div>
                                <label>Zero price action: {'\u00A0'}
                                    <Select
                                        showSearch
                                        placeholder="Select zero price action"
                                        optionFilterProp="children"
                                        style={{width: 200}}
                                        value={product.zeroPriceAction}
                                    >
                                        <Option value="R">Do not allow customers to add the product to cart</Option>
                                        <Option value="P">Allow customers to add the product to cart</Option>
                                        <Option value="A">Ask customer to enter the price</Option>
                                    </Select>
                                </label>
                            </div>

                            <div>
                                <label>Inventory: {'\u00A0'}
                                    <Tooltip placement="topLeft" title={"Track in stock product quanity. Enable the \"Enable inventory tracking\" option (Settings -> General) to modify."}>
                                        <Icon type="question-circle" />
                                    </Tooltip>{'\u00A0'}
                                    <Select
                                        showSearch
                                        placeholder="Select inventory"
                                        optionFilterProp="children"
                                        style={{width: 200}}
                                        value={product.inventory}
                                    >
                                        <Option value="B">Track without options</Option>
                                        <Option value="D">Do not track</Option>
                                    </Select>
                                </label>
                            </div>

                            <div>
                                <label>Minimum order quantity: {'\u00A0'}
                                    <Input placeholder="Input Minimum order quantity" type="number" value={product.orderQuantityMin} />
                                </label>
                            </div>

                            <div>
                                <label>Maximum order quantity: {'\u00A0'}
                                    <Input placeholder="Input Maximum order quantity" type="number" value={product.orderQuantityMax} />
                                </label>
                            </div>

                            <div>
                                <label>Quantity step: {'\u00A0'}
                                    <Input placeholder="Input Quantity step" type="number" value={product.quantityStep} />
                                </label>
                            </div>

                            <div>
                                <label>List quantity count: {'\u00A0'}
                                    <Input placeholder="Input List quantity count" type="number" value={product.listQuantityCount} />
                                </label>
                            </div>

                            <div>
                                <label>Taxes: {'\u00A0'}
                                    <Checkbox name="vat" checked={product.vat}/><span>VAT</span>
                                </label>
                            </div>
                        </div>
                    )
                }}
            </Query>
        );
    }
}

export default PricingInventory;