import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'
import'./Forget.css'

function Formget() {
    const [users,setUsers]=useState([])

    
    const Navigate=useNavigate()

    useEffect(()=>{
        axios.get('http://localhost:1900/userget')
        .then(Response=>{
            setUsers(Response.data);
            
        })
        .catch(Error=>{
            console.error('Error fetching user:',Error)
        })


    },[])
    const handleupdate=(id)=>{
        Navigate(`/updateget/${id}`)
    }
    // const handleDelete=(id)=>{
        
    //     axios.delete(`http://localhost:1900/user/${id}`,)
    //     .then(Response=>{
    //         console.log('user deleted',Response.data);
    //         setUsers(prevUsers=>prevUsers.filter(user=>user._id !==id))
    //         Navigate('/get')
           
            
    //     })
    //     .catch(Error=>{
    //         console.error('Error deleting user:',Error)
    //     })


    // }

    const handleDelete = (id) => {
        axios.delete(`http://localhost:1900/user/${id}`)
            .then(response => {
                console.log('User deleted:', response.data);
                
                setUsers(prevUsers => prevUsers.filter(user => user._id !== id));
               
                Navigate('/get'); 
            })
            .catch(error => {
                console.error('Error deleting user:', error);
            });
    };

    
    return(
        <div>
            <h2>User list</h2>
            {users.length > 0 ?(
                <div className='list'>
                    {users.map(user=>(
                        <div key={user._id}>
                           <ol>
                           <li> <strong>name:</strong>{user.name}<br/></li>
                            <li><strong>email:</strong>{user.email}<br/></li>
                           <li> <strong>age:</strong>{user.age}</li>
                            </ol>
                            <button onClick={()=>handleupdate(user._id)}>update</button>
                          <button onClick={()=>handleDelete(user._id)}>delete</button>
                          
                          </div>
                    ))}
                    
                    </div>
            ) : (
                <p>no Users found.</p>
            )}
        </div>
    )
  
}

export default Formget