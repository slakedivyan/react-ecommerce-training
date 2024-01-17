import { Component } from "react";
import ProductGallery from "./ProductGallery";
import ProductList from "./ProductList";
import axios from 'axios';

// The instance of components are created only once
// Until you refresh the page the component will reside in memory
class Products extends Component {

    APIENDPOINT = "http://localhost:8080/"

    // Constructor will get executed only once
    constructor() {
        super();
        this.state = {
            isGallery: true,
            products: [],
            searchResults: [],
            shoppingCart: [],
            message: ""
        }
    }

    // One of the lifecycle hook which gets executed automatically
    // whenever the component gets added to the DOM
    componentDidMount() {
        // Synchronous coding is not supported by JavaScript (no threads in JS)
        // let products = axios.get(this.APIENDPOINT + "product");
        // Asynchronous coding (axios will not wait for the server to respond)
        axios.get(this.APIENDPOINT + "products").then((response) => {
            this.setState({ products: response.data });
        }).catch((error) => {
            this.setState({ message: error });
        })
        axios.get(this.APIENDPOINT + "shoppingcart").then((response) => {
            this.setState({ shoppingCart: response.data })
        }).catch((error) => {
            this.setState({ message: error });
        })
    }

    doSearch = (event) => {
        let searchkeyword = event.target.value;
        if (searchkeyword === '') {
            this.setState({ searchResults: [] })
        } else {
            let expression = new RegExp('^' + searchkeyword, 'i')
            let results = this.products.filter((product) => {
                return expression.test(product.name)
            })
            this.setState({ searchResults: results })
        }
    }

    addToCart = (product, requiredQuantity) => {
        let item = { product: product, requiredQuantity: requiredQuantity }
        let shoppingCart = this.state.shoppingCart;
        axios.post(this.APIENDPOINT + "shoppingcart", item)
            .then((response) => {
                shoppingCart.push(item);
                this.setState({ shoppingCart: shoppingCart});
                this.setState({ message: "Product added to the shopping cart successfully" });
            }).catch((error) => {
                this.setState({ message: error });
            })
    }

    render() {
        return (
            <div>
                {
                    (this.state.message) &&
                        <div className="alert alert-danger">
                            { this.state.message }
                        </div>
                }
                <div className="row" style={ {paddingBottom: "15px"} }>
                    <div className="col-10">
                        <input type="text" className="form-control"
                            onChange={ this.doSearch }/>
                        <div className="searchResults">
                            <table className="table table-bordered">
                                <tbody>
                        {
                            this.state.searchResults.map((product, index) => {
                                return (
                                    <ProductList product={product} 
                                        no={index} key={index}
                                        click={ this.addToCart }/>
                                )
                            })
                        }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col-1">
                    <button type="button" class="btn btn-primary position-relative">
                        &nbsp;&nbsp;&nbsp;Cart&nbsp;&nbsp;&nbsp;
                        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        { this.state.shoppingCart.length }
                        </span>
                    </button>                        
                    </div>
                    <div className="col-1">
                        <button className="btn btn-success" style={ { float: "right" } }
                            onClick= { 
                                () => { 
                                    this.setState({ isGallery: !this.state.isGallery }) 
                                }
                            }>
                            { this.state.isGallery ? 'List' : 'Gallery' }</button>
                    </div>
                </div>
                {
                    (() => {
                        if (this.state.isGallery) {
                            return (
                                <div className="row">
                                {
                                    this.state.products.map((product, index) => {
                                        return (
                                            <ProductGallery product={product} key={index}
                                                click={ this.addToCart }/>
                                        )
                                    })
                                }
                                </div>
                            )
                        } else {
                            return (
                                <div className="row">
                                    <div className="col-12">
                                        <table className="table table-bordered">
                                            <thead>
                                            <tr>
                                                <th>No.</th>
                                                <th colSpan={2}>Product</th>
                                                <th>Quantity</th>
                                                <th>Price</th>
                                                <th>Action</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                {
                                    this.state.products.map((product, index) => {
                                        return (
                                            <ProductList product={product} 
                                                no={index} key={index}
                                                click={ this.addToCart }/>
                                        )
                                    })
                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )
                        }    
                    })()
                }
            </div>
        )
    }

}

export default Products;