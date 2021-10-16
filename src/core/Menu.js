import React, {Fragment}from 'react';
import {Link,withRouter} from 'react-router-dom'
import {signout,isAuthenticated} from '../auth/index'

import {itemTotal} from './cartHelpers'

//const {role}=isAuthenticated()

const isActive=(history,path)=>{
    if(history.location.pathname===path){
        return {color:"#ff9900"}
    } else {
        return {color:"white"}
    }
}



const Menu = ({history}) => {
    return (
        <Fragment>
            <ul className="nav nav-tabs bg-primary">
                <li className="nav-item"> 
                <Link className="nav-link" style={isActive(history,'/')} to="/">Home</Link>
                
                </li>
                <li className="nav-item"> 
                <Link className="nav-link" style={isActive(history,'/shop')} to="/shop">Shop</Link>
                
                </li>
               
                <li className="nav-item">
                <Link
                    className="nav-link"
                    style={isActive(history,"/cart")}
                    to="/cart"
                >
                    Cart{" "}
                    <sup>
                        <small className="cart-badge">{itemTotal()}</small>
                    </sup>
                </Link>
            </li>
                {isAuthenticated()&& isAuthenticated().user.role ===0 &&( //isAuthenticated()&& role===0
                   
                    <li className="nav-item"> 
                    <Link className="nav-link" style={isActive(history,'/user/dashboard')} to="/user/dashboard">Dashboard</Link>
                    
                    </li>
               )}
               {isAuthenticated()&& isAuthenticated().user.role===1 &&(
                  //isAuthenticated().user.role also can use
                    <li className="nav-item"> 
                    <Link className="nav-link" style={isActive(history,'/admin/dashboard')} to="/admin/dashboard">Dashboard</Link>
                    
                    </li>
               )}
               {!isAuthenticated() && (
                   <Fragment>   
                          <li className="nav-item"> 
                <Link className="nav-link" style={isActive(history,'/signin')} to="/signin">SignIn</Link>
                
                </li>

                <li className="nav-item"> 
                <Link className="nav-link" style={isActive(history,'/signup')}  to="/signup">SignUp</Link>
                
                </li>

                   </Fragment>
               )}
                {isAuthenticated() &&(
                    <li className="nav-item"> 
                    <span className="nav-link" style={{cursor:'pointer',color:'white'}} 
                   
                   onClick={() =>signout(()=>{
                       history.push('/')
                   })}
                   
                   >SignOut</span>
                    
                    </li>
                )}
            </ul>
        </Fragment>
    );
};

export default withRouter(Menu);