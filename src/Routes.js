import React from 'react';
import {BrowserRouter,Switch,Route} from 'react-router-dom'

import Signup from './User/Signup'
import Signin from './User/Signin'
import Home from './core/Home';
import Menu from './core/Menu';
import PrivateRoute from './auth/PrivateRoute'
import AdminRoute from './auth/AdminRoute'
import AdminDashboard from './User/AdminDashboard'
import Dashboard from './User/UserDashboard'
import AddCategory from './Admin/AddCategory'
import AddProduct from './Admin/AddProduct'
import Shop from './core/Shop'
import Orders from './Admin/Orders'
import Product from './core/Product'
import Profile from './User/Profile'
import Cart from './core/Cart'

 
const Routes = () => {
    return (
        <BrowserRouter>
     
            <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/shop' exact component={Shop} />
              <Route path='/signin' exact component={Signin} />
              <Route path='/signup' exact component={Signup} />

             <PrivateRoute path='/user/dashboard'exact component={ Dashboard}/>
             <AdminRoute path='/admin/dashboard'exact component={ AdminDashboard}/>
             <AdminRoute path='/create/category'exact component={ AddCategory}/>
             <AdminRoute path='/create/product'exact component={ AddProduct}/>
        
            <Route path='/product/:productId' exact component={Product} />
            <Route path='/cart' exact component={Cart} />
            <AdminRoute path='/admin/orders'exact component={Orders}/>
            <PrivateRoute path='/profile/:userId'exact component={ Profile}/>
          
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;