import React from 'react';
import {useState,useEffect} from 'react';
import Layout from './Layout';
import  {getProducts} from'./ApiCore'
import {getCategories,getFilteredProducts} from './ApiCore'
import Card from './Card'
import Checkbox from './Checkbox'
import RadioBox from './Radiobox'
import {prices} from './FixedPrices'



    const Shop = () => {

        const [myFilters,setMyFilters]= useState({

          filters:{ category:[],price:[]}

        })
        const [categories,setCategories] = useState([])
        const [limit,setLimit] = useState(6)
        const [skip,setSkip] = useState(0)
        const [error,setError] = useState(false)
        const [filteredResults,setFilteredResults] = useState(0)
const [size,setSize] = useState(0)
       

const loadFilteredResults=(newFilters)=>{
           // console.log(newFilters)

          getFilteredProducts(skip,limit,newFilters).then(data=>{
             // console.log(data);
         // console.log(skip,limit,newFilters,data)
              if(data.error){
                  setError(data.error)
              }else{
               
                 setFilteredResults(data.data)
                 setSize(data.size)
                 setSkip(0)
                // console.log(data)
                // console.log(data.data)
              }
          }).catch(error => {
            let err = {error}
            console.log(err.error);
            //do whatever you want with the err object
        });

        }

        const loadMore=()=>{

            let toSkip = skip + limit ;
            // console.log(newFilters)
 
           getFilteredProducts(skip,limit,myFilters.filters).then(data=>{
          // console.log(skip,limit,newFilters,data)
     
               if(data.error){
                   setError(data.error)
               }else{
                 
                  setFilteredResults([...filteredResults,...data.data])
                  setSize(data.size)
                  setSkip(toSkip)
                //  console.log(data)
                 // console.log(data.data)
               }
           }).catch(error => {
             let err = {error}
             console.log(err.error);
        
         });
 
         }

const loadMoreButton=() => {
    return (
        size> 0&& size>= limit &&(
            <button onClick={loadMore} className="btn btn-warning mb-5">Load More</button>
        )
    )
}


        const init=()=>{
            getCategories().then(data=>{
               
                if(data.error){
                   setError(data.error)
                }else{
                    setCategories(data)
                   // console.log(data)
                }
            })
        }

useEffect(() =>{
init()
loadFilteredResults(skip,limit,myFilters.filters)
},[])

const handleFilters=(filters,filterBy)=>{
  // console.log('shop',filters,filterBy)

  const newFilters = {...myFilters}
  newFilters.filters[filterBy]=filters


if(filterBy === 'price'){
    let priceValues = handlePrice(filters)
    newFilters.filters[filterBy]=priceValues
}

loadFilteredResults(myFilters.filters)
  setMyFilters(newFilters)

}





const handlePrice =value =>{

    const data = prices
    let array =[]


    for(let key in data){
        if(data[key]._id === parseInt(value))
        array = data[key].array
    }
    return array;
}
        return (
            <Layout title="Shop Page" description="Search and Find books of your choice" 
            className='container-fluid'>
            
           
         <div style={{marginTop:'40px',
        marginLeft:'30px'}}className="row">

             <div className="col-4">
                 <h4>Filter By Categories :-</h4>
         <ul>
         <Checkbox  categories={categories} 
          handleFilters={filters=>handleFilters(filters,'category')}       />
         </ul>

         <h4>Filter By Price Range :-</h4>
         <div>
         <RadioBox prices={prices} 
          handleFilters={filters=>handleFilters(filters,'price')}       />
         </div>

             </div>

             <div className="col-8">
               <h2 className='mb-4'>Products</h2>
               <div className="row">
                   {filteredResults.map((product,i)=>(
                    
                         <Card product={product}/>
                  
                   ))}
               </div>
               <hr/>
               {loadMoreButton()}
             </div>

         </div>
         
            </Layout> 
          
        );
    };
        
export default Shop;