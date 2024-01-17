// this function is returning something called 
// JSX - HTML-like markup
function Product(props) {
    return (
      <div className="product">
        <h1>{ props.name }</h1>
        <p>Quantity: { props.quantity }</p>
      </div>
    )
  }
  
  let app = (
    <div>
      <Product name="Television" quantity="10"/>
      <Product name="Laptop" quantity="25"/>
    </div>
  )
  
  ReactDOM.render(app, document.querySelector("#p1"))