import { Component } from "react";

class ProductGallery extends Component {

    constructor() {
        super();
        this.state = {
            requiredQuantity: 0
        }
    }

    render() {
        return (
            <div className="col-md-4" style={{ paddingBottom:"20px" }}>
                <div className="card">
                    <img src={ this.props.product.photo } className="card-img-top" 
                        alt={ this.props.product.name }/>
                    <div className="card-body">
                        <h4 className="card-title">{ this.props.product.name }</h4>
                        <p className="card-text">{ this.props.product.description }</p>
                        <h6 className="card-text">
                            Quantity: { this.props.product.quantity }</h6>
                        <h6 className="card-text">
                            Price: { this.props.product.price }</h6>
                        <input type="text" name="requiredQuantity" 
                            size="3" maxLength="3" onChange={(event) => {
                                this.setState({ requiredQuantity: event.target.value })
                            }}/>&nbsp;
                        <button className="btn btn-primary"
                            onClick={ this.props.click.bind(this, this.props.product, 
                                    this.state.requiredQuantity) }>
                                Add to Cart</button>
                    </div>
                </div>
            </div>
        )
    }

}

export default ProductGallery;