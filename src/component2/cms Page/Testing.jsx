
import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function Testing() {
const [data,setData]=useState("")
 
const success =`http://itdevelopmentservices.com/hrsolutions/admin`
const declined =`http://itdevelopmentservices.com/hrsolutions/Admin/Job-Posting`
const totaoamount = 1


useEffect(()=>{
apiget()
},[])
  const apiget =() =>{
    axios.get(`http://13.51.205.211:4102/api/create_checkOut_session?cancelUrl=${success},?receiptUrl=${declined},?total_amount=${totaoamount}`).then((response)=>{
    setData(response.data.checkoutUrl)
    console.log(response.data.checkoutUrl)
    }).catch((error)=>{
      console.log(error.response.data)
    })
  }
  
  return (
    <>
      <a href={data}>pay</a>
    </>
  )
}
