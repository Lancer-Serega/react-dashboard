import * as React from "react";
import {Tooltip, Icon, Select, Spin} from "antd";
import gql from "graphql-tag";
import {Query} from "react-apollo";

const query = gql`
    query ProductExtraQuery($_id: Int!) {
        productExtra(_id: $_id) {
            _id
            detailsView
        }
    }
`;

class Extra extends React.Component<{productId: number}> {
    public render() {
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

                    const product = data.productExtra;
                    const {Option} = Select;

                    return (
                        <div data-name="extra">
                            <div>
                                <label>Product details view: {'\u00A0'}
                                    <Select
                                        showSearch
                                        placeholder="Select product details view"
                                        optionFilterProp="children"
                                        style={{width: 200}}
                                        value={product.detailsView}
                                    >
                                        <Option value="default">Parent (Default template)</Option>
                                        <Option value="bigpicture_template">The big picture</Option>
                                        <Option value="default_template">Default template</Option>
                                    </Select>
                                </label>
                            </div>
                            <div>
                                <label>Short description: {'\u00A0'}

                                </label>
                            </div>
                            <div>
                                <label>Popularity: {'\u00A0'}
                                    <Tooltip placement="topLeft" title={"Product popularity rating based on how many times the storefront has been viewed, number of additions to cart and number of purchases."}>
                                        <Icon type="question-circle" />
                                    </Tooltip>{'\u00A0'}
                                </label>
                            </div>
                            <div>
                                <label>Search words: {'\u00A0'}

                                </label>
                            </div>
                            <div>
                                <label>Promo text: {'\u00A0'}

                                </label>
                            </div>
                        </div>
                    )
                }}
            </Query>
        );
    }
}

export default Extra;