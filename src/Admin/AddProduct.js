import React,{useState,useEffect} from 'react';

import Layout from '../core/Layout'

import {isAuthenticated} from '../auth/index'

import {Link} from  'react-router-dom'

import{createProduct,getCategories} from'./apiADmin'



 const AddProduct = () => {

    const [values,setValues] = useState({
        name: '',
        description:'',
        price:'',
        categories: [],
        category: '',
        shipping: '',
        quantity:'',
        photo:"",
        loading: false,
        error:'',
        createdProduct: '',
        redirectToProfile:false,
        formData:''

})


const{
    name,
    description,
    price,
    categories,
    category,
    shipping,
    quantity,
    loading,
    error,
    createdProduct,
    redirectToProfile,
    formData
} = values

//load categories and set form formData

const init=()=>{
    getCategories().then(data=>{
        if(data.error){
            setValues({...values, error: data.error})
        }else{
            setValues({...values,categories:data,formData:new FormData()})
        }
    })
}



useEffect(()=>{
init()
},[])

const handleChange=name=>event=>{
    const value = name ==='photo' ? event.target.files[0] : event.target.value
    
    formData.set(name, value)
    
    setValues({...values, [name]: value})
}
const {user,token} = isAuthenticated()
const clickSubmit =(event)=>{
    event.preventDefault()
    setValues({...values,error:'',loading:true})
    createProduct(user._id,token,formData) 
    .then(data=>{
        if(data.error){
            setValues({...values,error:data.error})
        }else{
            setValues({...values,name: '',
            description:'',
            price:'',
           
            quantity:'',
            photo:"",
            loading: false,
            error:'',
            createdProduct: data.name
            })
        }
    })
}



    return (
       
    <Layout title=' Add a new Product' description={`G'day ${user.name}, ready to add a new Product?`} className="container-fluid">
       

<div className='row'>

<div className="col-md-8 offset-md-2">
<div className='alert alert-danger' style={{display:error  ? '' :'none'}}>
       {error}
    </div>
   { loading && (<div className='alert alert-success'><h2>loading....</h2></div>)}

    <div className='alert alert-info' style={{display:createdProduct  ? '' :'none'}}>
    <h2>{`${createdProduct}  is created!`}</h2>
 </div>
<form className='mb-3' onSubmit={clickSubmit}>

<h4>Post Photo</h4>
<div className="form-group">

    <label className="btn btn-secondary">
    <input onChange={handleChange('photo')}type="file" name="photo" accept='image/*'/>
    </label>
</div>


<div className="form-group">

<label className="text-muted">Name</label>
<input onChange={handleChange('name')} type='text' className='form-control' value={name}/>

</div>

<div className="form-group">

<label className="text-muted">Description</label>
<textarea onChange={handleChange('description')} type='text' className='form-control' value={description}/>

</div>


<div className="form-group">

<label className="text-muted">Price</label>
<input onChange={handleChange('price')} type='number' className='form-control' value={price}/>

</div>

<div className="form-group">

<label className="text-muted">Category</label>
<select onChange={handleChange('category')} className='form-control' >
<option >Please Select </option>
      {categories && categories.map((c,i)=>(
          <option key={i} value={c._id}>{c.name}</option>
      ))}
    </select>

</div>

<div className="form-group">

<label className="text-muted">Quantity</label>
<input onChange={handleChange('quantity')} type='number' className='form-control' value={quantity}/>

</div>


<div className="form-group">

<label className="text-muted">Shipping</label>
<select onChange={handleChange('shipping')} className='form-control' >
<option >Please Select </option>
      <option value='0'>No </option>
      <option value='1'>Yes</option>
      
    </select>

</div><br/>
<button className="btn btn-outline-primary">Create Product</button>
</form>


<div className='mt-5'>
       <Link to='/admin/dashboard' className='text-primary'>Back To Dashboard</Link>
   </div>

</div>


</div>

    </Layout>
    );
      }

export default AddProduct;