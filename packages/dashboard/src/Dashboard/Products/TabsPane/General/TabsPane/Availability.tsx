import * as React from "react";
import {Tooltip, Icon, Checkbox, Input, Select, Spin, DatePicker} from "antd";
import * as moment from 'moment';
import {Query} from "react-apollo";
import gql from "graphql-tag";

const query = gql`
    query ProductAvailabilityQuery($_id: Int!) {
        productAvailability(_id: $_id) {
            _id
            userGroups
            creationDate
            availSince
            outOfStockActions
        }
    }
`;

class Availability extends React.Component<{productId: number}> {
    private onChange(checkedValues: any) {
        console.log('checked = ', checkedValues);
    }

    public render() {
        const {Option} = Select;
        const {Group} = Checkbox;
        const plainOptions = ['All', 'Guest', 'Registered user'];
        const formatTimestamp = 'x';

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

                    const product = data.productAvailability;

                    return (
                        <div className="form-inputs" data-name="availability">
                            <div>
                                <label>User groups: {'\u00A0'}
                                    <Group options={plainOptions} defaultValue={[...product.userGroups]} onChange={this.onChange} />
                                </label>
                            </div>

                            <div>
                                <label>Creation date: {'\u00A0'}
                                    <DatePicker placeholder="" defaultValue={moment(product.creationDate, formatTimestamp)} format={'YYYY-MM-DD'} />
                                </label>
                            </div>

                            <div>
                                <label>Avail since: {'\u00A0'}
                                    <DatePicker placeholder="" defaultValue={moment(product.availSince, formatTimestamp)} format={'YYYY-MM-DD'} />
                                </label>
                            </div>

                            <div>
                                <label>Out of stock actions: {'\u00A0'}
                                    <Tooltip placement="topLeft" title={"Note that the 'Buy in advance' option requires a positive product amount while the 'Sign up for notification' option requires a non-positive amount. Also note that the 'Sign up for notification' option is not applied to products tracked with options."}>
                                        <Icon type="question-circle" />
                                    </Tooltip>{'\u00A0'}
                                    <Select
                                        showSearch
                                        placeholder="Select out of stock actions"
                                        optionFilterProp="children"
                                        style={{width: 200}}
                                        value={product.outOfStockActions}
                                    >
                                        <Option value="N">None</Option>
                                        <Option value="B">Buy in advance</Option>
                                        <Option value="S">Sign up for notification</Option>
                                    </Select>
                                </label>
                            </div>
                        </div>
                    )
                }}
            </Query>
        );
    }
}

export default Availability;