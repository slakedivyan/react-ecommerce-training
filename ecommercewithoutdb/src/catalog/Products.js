import { Component } from "react";
import ProductGallery from "./ProductGallery";
import ProductList from "./ProductList";

// In class based component we inherit the props and state from the parent component 
// However in functional component we do not inherit it from any parent, we get
// props through paramter and state through React Hooks
class Products extends Component {

    constructor() {
        super();
        // this.isGallery = true;
        // this.message = "Hello world !!!";
        this.state = {
            isGallery: true,
            searchResults: [],
            shoppingCart: [],
            message: ""
        }
        this.products = [
            {
                name: "Television",
                description: "To watch movies",
                quantity: 10,
                price: 1455.25,
                photo: "https://media.product.which.co.uk/prod/images/pr_4to3_400x300/03ccb6620724-what-size-tv.jpg"
            },
            {
                name: "Radio",
                description: "To listen music",
                quantity: 25,
                price: 234.55,
                photo: "https://forum.lowyat.net/uploads//attach-27/post-181327-1420904390_thumb.jpg"
            },
            {
                name: "Laptop",
                description: "To do work",
                quantity: 35,
                price: 3456.75,
                photo: "https://c.ndtvimg.com/2021-06/klnbc1mo_laptop1_640x480_26_June_21.jpg?downsize=400:300&output-quality=80"
            },
            {
                name: "Computer",
                description: "To play games",
                quantity: 40,
                price: 2839.25,
                photo: "https://5.imimg.com/data5/UU/AW/MY-55639974/14-500x500.jpg"
            },
            {
                name:"Tablet",
                description: "To do presentation",
                quantity: 60,
                price: 789.15,
                photo: "https://static.toiimg.com/thumb/msid-81447232,imgsize-251079,width-400,resizemode-4/81447232.jpg"
            },
            {
                name:"Bicycle",
                description: "To travel",
                quantity: 150,
                price: 1234.55,
                photo: "https://www.motoshark.com/wp-content/uploads/2019/07/dirt-bike-size-kids.jpg"
            }
        ]
    }

    /* 
    showAlert() { console.log("Hello world !!!") }
    // In the above case, showAlert will be executed inside button context
    // previously we are not referring to any property or method
    // belongs to product.js so the method can be a normal method

    // However in the following scenario we are referring to the property
    // that belongs to product.js. So the showAlert method must run in
    // Product.js context (caller context). Not in button context.
    // the following the method cannot be a normal method
    showAlert() { console.log(this.message) }

    // Let us convert it to a lambda method
    showAlert = () => console.log(this.message);
    */

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
        shoppingCart.push(item);
        this.setState({ message: "Product added to the shopping cart successfully" });
    }

    /* 
    class based component must have a method called
    render and it must return JSX code
    */
    render() {
        return (
            <div>
                {
                    // Logical AND operator && in JSX
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
                        {
                            /* 
                            We assign the function to the event without ()
                            <button className="btn btn-success" style={ { float: "right" } }
                                onClick={ this.showAlert }>List</button>

                            if the method is a single liner you can write it
                            straight away inside the jsx code
                            <button className="btn btn-success" style={ { float: "right" } }
                                onClick={ () => console.log("Hello World !!!") }>
                                List</button>
                            
                            <button className="btn btn-success" style={ { float: "right" } }
                                onClick={ () => { this.isGallery = !this.isGallery; } }>
                                List</button>
                            // In the previous code we change the value of the variable 
                            // isGallery from true to false and false to true
                            // However the view is not changing, because we never trigger
                            // the rerendering process of React framework

                            // To initiate the re-render process in React we must 
                            // create a "state" variable. This particular variable is
                            // being monitor by React framework. If any change happen
                            // to the state variable then React will automatically
                            // initiate the re-render process.
                            // Create state variable and then assign this variable
                            // with an JavaScript object, which will allow us to
                            // create multiple variables which will be monitor by React

                            // Note: Please remember in class based component to modify
                            // the variable in the state object you must use the
                            // setState method which we inherit from parent component
                            */
                        }
                        <button className="btn btn-success" style={ { float: "right" } }
                            onClick= { 
                                () => { 
                                    this.setState({ isGallery: !this.state.isGallery }) 
                                }
                            }>
                            {
                                /*
                                (() => {
                                    if (this.state.isGallery)
                                        return "List";
                                    else
                                        return "Gallery";
                                })()
                                */
                                this.state.isGallery ? 'List' : 'Gallery'
                            }</button>
                    </div>
                </div>
                {
                    /* JavaScript code will be placed here */
                    /* However, you cannot create variables and assign values to it */
                    /* React expects you to have a function that returns JSX code */
                    (() => {
                        if (this.state.isGallery) {
                            return (
                                <div className="row">
                                {
                                    this.products.map((product, index) => {
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
                                    this.products.map((product, index) => {
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