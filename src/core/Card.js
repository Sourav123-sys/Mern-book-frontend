import React,{useState,useEffect} from 'react';
import {Link,Redirect} from 'react-router-dom'
import {addItem,updateItem,removeItem} from './cartHelpers'
import ShowImage from './ShowImage'
import  moment from'moment'

const Card = ({product,
  showViewProductButton=true,
  showAddToCartButton=true,
  cartUpdate=false,
  showRemoveProductButton = false,
  setRun = f => f,
  run = undefined}) => {

  //console.log(product)
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);
const showViewButton=(showViewProductButton)=>{
  
  return(
    showViewProductButton  && (
      <button className="btn btn-outline-primary mt-2 mb-2">
       View Product
      </button>
       )
 )
  
}
const showRemoveButton = showRemoveProductButton => {
  return (
    showRemoveProductButton && (
      <button
        onClick={() => {
          removeItem(product._id);
          setRun(!run); // run useEffect in parent Cart
        }}
        className="btn btn-outline-danger mt-2 mb-2"
      >
        Remove Product
      </button>
    )
  );
};
const handleChange = productId => event => {
  //setRun(!run); // run useEffect in parent Cart
  setCount(event.target.value < 1 ? 1 : event.target.value);
  if (event.target.value >= 1) {
   updateItem(productId, event.target.value);

  }
};
const showCartUpdateOptions = cartUpdate => {
  return (
    cartUpdate && (
      <div>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">Adjust Quantity</span>
          </div>
          <input type="number" className="form-control" value={count} onChange={handleChange(product._id)} />
        </div>
      </div>
    )
  );
};
const addToCart = () => {
   console.log('added');
  addItem(product, setRedirect(true));
};

const shouldRedirect = redirect => {
  if (redirect) {
    return <Redirect to="/cart" />;
  }
};
const showAddToCart=(showAddToCartButton)=>{
 return(
  showAddToCartButton && (
    <button  onClick={addToCart}className="btn btn-outline-warning mt-2 mb-2 mr-2">
           Add to Cart
   </button> 
  )
 )
}

const showStock = (quantity) => {
    return quantity > 0 ? <span style={{backgroundColor:'blue',
 padding:"5px 5px",
borderRadius:'10px',
color:'white' }} > In Stock</span> 
    
    : <span style={{backgroundColor:'red',
    padding:"5px 5px",
   borderRadius:'10px',
   color:'white' }}> Out of Stock </span>
}


    return (
     


      <div className="card">

       <div className="card-header name">{product.name}</div>
            <div className="card-body">

             {shouldRedirect(redirect)}

                <ShowImage item={product} url='product'/>

                <p className='lead mt-2'><b>{product.description}</b></p>
                <p className='black-8' > <b>{product.price}$</b></p>
               

                <p className="black-8">
                 <b> Added on {moment(product.createdAt).fromNow()}</b> 
                </p>

                  {showStock(product.quantity)} 
                  <br/> <br/>
                <Link to={`/product/${product._id}`}>
           {showViewButton(showViewProductButton)}
                </Link>
        
        {showAddToCart(showAddToCartButton)}
        {showRemoveButton(showRemoveProductButton)}
        {showCartUpdateOptions(cartUpdate)}
              
            </div>
      </div>


    
    );
};

export default Card;