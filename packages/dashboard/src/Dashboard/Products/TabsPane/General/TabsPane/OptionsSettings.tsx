import * as React from "react";
import {Form, Select, Spin} from "antd";
import {Query} from "react-apollo";
import gql from "graphql-tag";

const query = gql`
    query ProductOptionsSettingsQuery($_id: Int!) {
        productOptionsSettings(_id: $_id) {
            _id
            optionsType
            exceptionsType
        }
    }
`;

class OptionsSettings extends React.Component<{productId: number}> {
    public render() {
        const {Option} = Select;
        const {Item} = Form;

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

                    const product = data.productOptionsSettings;

                    return (
                        <div className="form-inputs" data-name="options-settings">
                            <label>Options type: {'\u00A0'}
                                <Select
                                    showSearch
                                    placeholder="Select options type"
                                    optionFilterProp="children"
                                    value={product.optionsType}
                                >
                                    <Option value="simultaneous">Simultaneous</Option>
                                    <Option value="sequential">Sequential</Option>
                                </Select>
                            </label>

                            <label>Exceptions type: {'\u00A0'}
                                <Select
                                    showSearch
                                    placeholder="Select exceptions type"
                                    optionFilterProp="children"
                                    value={product.exceptionsType}
                                >
                                    <Option value="forbidden">Forbidden</Option>
                                    <Option value="allowed">Allowed</Option>
                                </Select>
                            </label>
                        </div>
                    )
                }}
            </Query>
        );
    }
}

export default OptionsSettings;