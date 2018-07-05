import * as React from "react";
import {Tooltip, Icon, Input, Select, Spin} from "antd";
import Draft, {htmlToDraft} from 'react-wysiwyg-typescript';
import gql from "graphql-tag";
import {Query} from "react-apollo";

interface IInformationState {
    editorState: any //string
}

const query = gql`
    query ProductGeneralInformationQuery($_id: Int!) {
        productGeneralInformation(_id: $_id) {
            _id
            image
            name
            status
            price
            vendor
            fullDescription
        }
    }
`;

class Information extends React.Component<{productId: number}, IInformationState> {
    constructor (props: {productId: number}) {
        super(props);
    }

    handleEditorState (editorState: any) {
        return this.setState({ editorState })
    }

    public render() {
        const {Option} = Select;
        
        return (
            <Query query={query} variables={{_id: this.props.productId}}>
                {({loading, data, error}) => {
                    if (loading) {
                        return <Spin/>
                    }
    
                    if (error) return <p>{error}</p>;
    
                    if (!data) {
                        return <h3>Product Not found</h3>
                    }

                    const product = data.productGeneralInformation;

                    this.state = {
                        editorState: htmlToDraft(product.fullDescription)
                    };

                    return <div data-name="information">
                        <div>
                            <label>Name:
                                <Input placeholder="Product name" value={product.name} />
                            </label>
                        </div>

                        <div>
                            <label>Vendor: {'\u00A0'}
                                <Select value={product.vendor} placeholder="Select vendor" style={{width: 200}}>
                                    <Option key={product.vendor}>{product.vendor}</Option>
                                </Select>
                            </label>
                        </div>

                        <div>
                            <label>Categories: {'\u00A0'}
                                <Tooltip placement="topLeft" title={"Categories to be displayed in the navigation breadcrumbs."}>
                                    <Icon type="question-circle" />
                                </Tooltip>
                            </label>
                        </div>

                        <div>
                            <label>Price ($):
                                <Input placeholder="Product name" value={product.price} />
                            </label>
                        </div>

                        <div>
                            <label>Full Description:
                                <Draft editorState={this.state.editorState} onEditorStateChange={this.handleEditorState} />
                            </label>
                        </div>

                        <div>
                            <label>Status: {'\u00A0'}
                                <Select showSearch
                                        placeholder="Select a status"
                                        optionFilterProp="children"
                                        style={{width: 200}}
                                        value={product.status}
                                >
                                    <Option value="active">Active</Option>
                                    <Option value="hidden">Hidden</Option>
                                    <Option value="disabled">Disabled</Option>
                                </Select>
                            </label>
                        </div>

                        <div>
                            <label>Images: {product.image}</label>
                        </div>
                    </div> 
                }}
            </Query>
        );
    }
}

export default Information;