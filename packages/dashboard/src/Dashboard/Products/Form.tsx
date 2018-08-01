import * as React from "react";
import {RouteComponent} from "../components/RouteComponent";
import {Tooltip, Icon, Input, Select, Spin, Button} from "antd";
import * as antd from "antd";
import Draft, {htmlToDraft} from 'react-wysiwyg-typescript';
import gql from "graphql-tag";
import {Query} from "react-apollo";
import { ReactImageCropperTs as ImageCropper } from "react-image-cropper-ts/src/react-image-cropper-ts";
import {EditorState} from "draft-js";

const query = gql`
    query ProductQuery($_id: Int!) {
        product(_id: $_id) {
            _id
            idVendor
            image
            title
            fullDescription
            price
            listPrice
            status
            quantity
            count
            vendor
            created
            category
            linkToDw
            linkToVendor
        }
    }
`;

interface IProductForm {
    blobFile?: File|null,
    editorState?: EditorState|null,
    isLoaded: boolean,
    error: {},
    items: [{}]
}

export class Form extends RouteComponent<{ id?: number }, IProductForm> {
    constructor (props: any) {
        super(props);
        this.state = {
            blobFile: null,
            editorState: null,
            isLoaded: false,
            error: null,
            items: []
        };

        this.handleEditorState = this.handleEditorState.bind(this);
        this.saveCropImage = this.saveCropImage.bind(this);
        this.saveData = this.saveData.bind(this);
    }

    public handleEditorState (editorState: any) {
        return this.setState({ editorState })
    }

    public handleChangeInput(event: any) {
        // this.setState({items: [...this.state.items, [event.target.name, event.target.value]]});
        debugger; // FIXME Delete before deploy!
    }

    public saveCropImage () {
        console.log(this.state.blobFile);
    }

    public saveData(e: any) {
        e.preventDefault();

        for(let i = 0; i < e.target.length; i++) {
            const name = e.target[i].name;
            const value = e.target[i].value;
            prevState.items.filter(function(el){
                if(el.hasOwnProperty(name)){
                    el.name
                }
            });

            this.setState( prevState => {
                if (name) {
                    return {
                        items: [
                            ...prevState.items,
                            {
                                [name]: value
                            }
                        ]
                    }
                }
            });
        }

        debugger; // FIXME Delete before deploy!
        // fetch("http://localhost:9005/products/", {
        //     method: 'POST',
        //     data: data
        // })
        //     .then(res => res.json())
        //     .then((result) => {
        //             this.setState({
        //                 isLoaded: true,
        //                 items: result.items
        //             });
        //         },
        //         // Note: it's important to handle errors here
        //         // instead of a catch() block so that we don't swallow
        //         // exceptions from actual bugs in components.
        //         (error) => {
        //             this.setState({
        //                 isLoaded: true,
        //                 error: error
        //             });
        //         }
        //     )
    }

    render() {
        const {Option} = Select;

        return <>
            <h3>Product {this.props.id}</h3>

            <Query query={query} variables={{_id: this.props.id}}>
                {({loading, data, error}) => {
                    if (loading) {
                        return <Spin/>
                    }

                    if (error) return <p>{error}</p>;

                    if (!data) {
                        return <h3>Product Not found</h3>
                    }

                    const product = data.product;

                    this.state = {
                        editorState: htmlToDraft(product.fullDescription)
                    };

                    return <div className="form-inputs" data-name="information">
                        <antd.Form ref={el => (this.form = el)} onSubmit={this.saveData}>
                            <div>
                                <label>ID DW: {'\u00A0'}
                                    <Input name={"id"} placeholder="ID Dropwow" value={this.props.id} disabled onChange={this.handleChangeInput.bind(this)} />
                                </label>
                            </div>

                            <div>
                                <label>ID Vendor: {'\u00A0'}
                                    <Input name={"idVendor"} placeholder="ID Vendor" value={product.idVendor} onChange={this.handleChangeInput.bind(this)} />
                                </label>
                            </div>

                            <div>
                                <label>Title: {'\u00A0'}
                                    <Input name={"title"} placeholder="Product title" value={product.title} onChange={this.handleChangeInput.bind(this)} />
                                </label>
                            </div>


                            <div>
                                <label>Link to dropwow: {'\u00A0'}
                                    <Input name={"linkToDW"} placeholder="Link to dropwow" value={product.linkToDw} onChange={this.handleChangeInput.bind(this)} />
                                </label>
                            </div>


                            <div>
                                <label>Link to Vendor: {'\u00A0'}
                                    <Input name={"linkToVendor"} placeholder="Link to Vendor" value={product.linkToVendor} onChange={this.handleChangeInput.bind(this)} />
                                </label>
                            </div>

                            <div>
                                <label>Vendor: {'\u00A0'}
                                    <Select name={"vendor"} value={product.vendor} placeholder="Select vendor">
                                        <Option key={product.vendor}>{product.vendor}</Option>
                                    </Select>
                                </label>
                            </div>

                            <div>
                                <label>Categories {'\u00A0'}
                                    <Tooltip placement="topLeft" title={"Categories to be displayed in the navigation breadcrumbs."}>
                                        <Icon type="question-circle" />
                                    </Tooltip>: {'\u00A0'}
                                    <Select name={"category"} value={product.category} placeholder="Select vendor">
                                        <Option key={product.category}>{product.category}</Option>
                                    </Select>
                                </label>
                            </div>

                            <div>
                                <label>Price ($): {'\u00A0'}
                                    <Input name={"price"} className="price" placeholder="Product name" value={product.price} onChange={this.handleChangeInput.bind(this)} />
                                </label>
                            </div>

                            <div>
                                <label>Full Description: {'\u00A0'}
                                    <Draft locale={'en'} editorState={this.state.editorState || new EditorState()} onEditorStateChange={this.handleEditorState} />
                                </label>
                            </div>

                            <div>
                                <label>Status: {'\u00A0'}
                                    <Select showSearch
                                            placeholder="Select a status"
                                            optionFilterProp="children"
                                            value={product.status}
                                            name={"status"}
                                    >
                                        <Option value="active">Active</Option>
                                        <Option value="hidden">Hidden</Option>
                                        <Option value="disabled">Disabled</Option>
                                    </Select>
                                </label>
                            </div>

                            <div>
                                <label>Images: {'\u00A0'} <img src={product.image} alt={product.name} /></label>
                                <ImageCropper onGetBlobFile={(blobFile: File) => this.setState({blobFile})} />
                                <Button onClick={this.saveCropImage}>Cup image</Button>
                            </div>

                            <div>
                                <Button type="primary" htmlType="submit"><Icon type="save" />{'\u00A0'}Save</Button>
                            </div>
                        </antd.Form>
                    </div>
                }}
            </Query>
        </>
    }
}