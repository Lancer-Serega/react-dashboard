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
            idAli
            image
            title
            price
            status
            vendor
            category
            linkToDw
            linkToAli
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

                    return <div className="form-inputs" data-name="information">
                        <div>
                            <label>ID DW: {'\u00A0'}
                                <Input placeholder="ID Dropwow" value={product._id} />
                            </label>
                        </div>

                        <div>
                            <label>ID Ali: {'\u00A0'}
                                <Input placeholder="ID Aliexpress" value={product.idAli} />
                            </label>
                        </div>

                        <div>
                            <label>Title: {'\u00A0'}
                                <Input placeholder="Product title" value={product.title} />
                            </label>
                        </div>


                        <div>
                            <label>Link to dropwow: {'\u00A0'}
                                <Input placeholder="Link to dropwow" value={product.linkToDw} />
                            </label>
                        </div>


                        <div>
                            <label>Link to Ali: {'\u00A0'}
                                <Input placeholder="Link to Ali" value={product.linkToAli} />
                            </label>
                        </div>

                        <div>
                            <label>Vendor: {'\u00A0'}
                                <Select value={product.vendor} placeholder="Select vendor">
                                    <Option key={product.vendor}>{product.vendor}</Option>
                                </Select>
                            </label>
                        </div>

                        <div>
                            <label>Categories: {'\u00A0'}
                                <Tooltip placement="topLeft" title={"Categories to be displayed in the navigation breadcrumbs."}>
                                    <Icon type="question-circle" />
                                </Tooltip>
                                <Select value={product.category} placeholder="Select vendor">
                                    <Option key={product.category}>{product.category}</Option>
                                </Select>
                            </label>
                        </div>

                        <div>
                            <label>Price ($): {'\u00A0'}
                                <Input className="price" placeholder="Product name" value={product.price} />
                            </label>
                        </div>

                        <div>
                            <label>Full Description: {'\u00A0'}
                                <Draft editorState={this.state.editorState} onEditorStateChange={this.handleEditorState} />
                            </label>
                        </div>

                        <div>
                            <label>Status: {'\u00A0'}
                                <Select showSearch
                                        placeholder="Select a status"
                                        optionFilterProp="children"
                                        value={product.status}
                                >
                                    <Option value="active">Active</Option>
                                    <Option value="hidden">Hidden</Option>
                                    <Option value="disabled">Disabled</Option>
                                </Select>
                            </label>
                        </div>

                        <div>
                            <label>Images: {'\u00A0'} <img src={product.image} alt={product.name} /></label>
                        </div>
                    </div> 
                }}
            </Query>
        );
    }
}

export default Information;