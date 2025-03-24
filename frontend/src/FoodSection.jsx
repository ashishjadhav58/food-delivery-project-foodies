import React, { useEffect, useState } from 'react'
import { API_URL } from './apiPath'
export default function FoodSection() {
    const [data,setdata]=useState([])
    const id = 
    useEffect(()=>{
        const getdata = async ()=>{
            const response = await axios.get(`${API_URL}\product\admin\${id}`)
        }
        getdata();
    },[])
  return (
    <div>
        <div className="container pt-3">
            <h1 className='text-center'>FOOD SECTION</h1>
            <div className="row justify-content-center pt-4">
            <div className="col-sm-3 bg bg-success me-5 mb-5" style={{width:"200px",height:"200px" , paddingTop:"70px"}}>
                    <h1 className='text text-light text-center '>+</h1>
                </div>
                <div className="col-sm-3 bg bg-success me-5 mb-5" style={{width:"200px",height:"200px" , paddingTop:"70px"}}>
                    <h1 className='text text-light text-center '>+</h1>
                </div>
                <div className="col-sm-3 bg bg-success me-5 mb-5" style={{width:"200px",height:"200px" , paddingTop:"70px"}}>
                    <h1 className='text text-light text-center '>+</h1>
                </div>
                <div className="col-sm-3 bg bg-success me-5 mb-5" style={{width:"200px",height:"200px" , paddingTop:"70px"}}>
                    <h1 className='text text-light text-center '>+</h1>
                </div>
                <div className="col-sm-3 bg bg-success me-5 mb-5" style={{width:"200px",height:"200px" , paddingTop:"70px"}}>
                    <h1 className='text text-light text-center '>+</h1>
                </div>
                
                
            </div>
        </div>
    </div>
  )
}
