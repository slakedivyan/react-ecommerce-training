import Header from './common/Header';
import Footer from './common/Footer';
import Products from './catalog/Products';

// our first react functional component which returns some JSX code
function App() {
  const title = "Online Bazzar";
  const footermessage = "Copyright MyCompany.com";
  // In reactJS the value for style is suppose to be a javascript object
  const headerStyle = {
    textAlign:"center",
    color:"blue"
  }  
  return (
    <div>
      <Header style={ headerStyle }>{ title }</Header>
      <div className="container">
        <Products/>
      </div>
      <Footer message={ footermessage }/>
    </div>
  );
}

export default App;
