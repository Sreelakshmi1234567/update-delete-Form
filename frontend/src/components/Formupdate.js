import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {useParams,useNavigate} from 'react-router-dom';

function Formupdate() {
  const [name,setName]=useState(' ');
  const [email,setEmail]=useState(' ');
  const [age,setAge]=useState(' ');
  const{id}=useParams();  //Get the ID from the URL
  const navigate=useNavigate();
  useEffect(()=>{
    console.log("ID from URL",id); //Log to the ID to ensure its correct
    if(id){
      axios.get(`http://localhost:1900/data/${id}`)
      .then(response=>{
        const userData=response.data;
        setName(userData.name);
        setEmail(userData.email);
        setAge(userData.age);
      })
      .catch(error=>{
        console.error('Error fetching user data',error.response?error.response.data:error.message);
      });
    }else{
      console.error("ID is not available");
      
    }
    
  },[id]);
  const handleSubmit=(e)=>{
    e.preventDefault();
    const formData={name,email,age};
    axios.put(`http://localhost:1900/user/${id}`,formData)
    .then(response=>{
      console.log('Updated succesfully:',response.data);
      navigate('/get'); 
    })
    .catch(error=>{
      console.error('Error updating user:',error.response ? error.response.data : error.message);
      
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input 
        type='text'
        value={name}
        onChange={(e)=>setName(e.target.value)}/><br/>
        <label>Emailid:</label>
        <input 
        type='email'
        value={email}
        onChange={(e)=>setEmail(e.target.value)}/><br/>
        <label>Age:</label>
        <input 
        type='number'
        value={age}
        onChange={(e)=>setAge(e.target.value)}/><br/>
         <button>Update</button>
      </form>
    </div>
  );
}

export default Formupdate;