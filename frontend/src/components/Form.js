import React,{useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import './Form.css'

function Form() {
 const [name,setname]=useState('')
 const [email,setEmail]=useState('')
 const [age,setAge]=useState('')

 const Navigate=useNavigate()

 const handlesubmit=(e)=>{
    e.preventDefault()

    const formdata={name,email,age}

    axios.post('http://localhost:1900/userpost',formdata)
    .then(Response=>{
        console.log('Response:',Response.data);
        
    })
    .catch(Error=>{
        console.error('Error:',Error)
    })
 }
 const handleView=()=>{
    Navigate('/get')
 }
 return(
    <>
    <h2>FORM</h2>
    <div className='form'>
        <form onSubmit={handlesubmit}>
            
            <label>Name:</label>
            <input type='text'value={name} onChange={(e)=>setname(e.target.value)}/><br/>
            <label>Email:</label>
            <input type='text'value={email} onChange={(e)=>setEmail(e.target.value)}/><br/>
            <label>Age  :</label>
            <input type='text'value={age} onChange={(e)=>setAge(e.target.value)} className='age'/>
            <br/>
            <button type='submit' className='sub'>Submit</button><button onClick={handleView} className='view'>View</button>
        </form>
        {/* <button onClick={handleView}>View</button> */}
    </div>
    </>
 )
}


export default Form