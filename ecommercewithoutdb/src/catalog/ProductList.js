// react hooks are nothing but javascript function
// initially it was introduced because something we can do with class based component
// but cannot do that in functional component 
// so they introduce hooks to solve those issues
// for example to replace this.setState they introduce useState
import { useState } from "react";

const ProductList = (props) => {
    
    // let us create a state to capture the requiredQuantity keyed in by user
    // In react the hooks function always state with the word "use"
    // This useState hook will create a state and will return 2 values
    // 1) the state variable
    // 2) the function to change the value of the state variable instead of setState method
    const [state, changeRequiredQuantity] = useState({ requiredQuantity: 0 })

    return (
        <tr>
            <td>{ props.no + 1 }</td>
            <td>
                <img src={ props.product.photo } className="img-thumbnail"
                    width="150" alt={ props.product.name }/>
            </td>
            <td>
                <h4 className="card-title">{ props.product.name }</h4>
                <p className="card-text">{ props.product.description }</p>
            </td>
            <td><h6>{ props.product.quantity }</h6></td>
            <td><h6>{ props.product.price }</h6></td>
            <td>
                <input type="text" name="requiredQuantity" 
                    size="3" maxLength="3" onChange={(event) => {
                        changeRequiredQuantity({ requiredQuantity: event.target.value })
                    }}/>&nbsp;
                <button className="btn btn-primary"
                    onClick={ props.click.bind(null, props.product, 
                        state.requiredQuantity) }>Add to Cart</button>                
            </td>
        </tr>
    )
}

export default ProductList;