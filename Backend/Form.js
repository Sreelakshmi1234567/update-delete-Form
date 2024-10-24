const express =require('express');
const app = express();
const port = 1900;

const cors =require('cors');
const { default: mongoose } = require('mongoose');
const Formmodel= require('./new/Data');
app.use (express.json());
app.use (cors());

mongoose.connect('mongodb://localhost:27017/FORMTASK')
.then(()=>{
    console.log('mongodb connected succesfully');
    
})
.catch((err)=>{
    console.log('mongodb connection error',err);
    

})
app.post('/userpost',async(req,res)=>{
    try{
        const{name,email,age}=req.body;
        const newuser=await Formmodel.create({name,email,age})
            res.status(201).json(newuser)
        }
 catch(error){
    res.status(400).json({error:errormessage})}
})

app.get('/userget',async(req,res)=>{
    try{
        const users=await Formmodel.find()
        res.json(users)
    }
    catch(error){
        res.status(500).json({error:error.errormessage})
    }
})
//UPDATE GET
app.get('/data/:id',async(req,res)=>{
    try{
        const {id}=req.params;
        const user=await Formmodel.findById(id);
        if(!user){
            return res.status(404).json({message:'User not found'});
        }
        res.status(200).json(user);
    }catch(error){
        res.status(400).json ({error:error.message});
    }
});

//PUT request to update a user by id 
app.put('/user/:id',async (req,res)=>{
    try{
        const {id}=req.params;
        const{ name , email , age }=req.body;
        const updatedUser =await Formmodel.findByIdAndUpdate(id,{name,email,age},{new:true});
        if(!updatedUser){
            return res.status(404).json({message:'User not found'});
        }
        res.status(200).json(updatedUser);
    }catch(error){
        res.status(400).json({error:error.message});
    }
});
// app.delete('/user/:id',async (req,res)=>{
//     try{
//         const {id}=req.params.id;
//         const{ name , email , age }=req.body;
//         const deletedUser =await Formmodel.findByIdAndDelete(id,{name,email,age},{new:true});
//         if(!deletedUser){
//             return res.status(404).json({userDeleted});
//         }
//         res.status(200).json(User);
//     }catch(error){
//         res.status(400).json({error:error.message});
//     }
// });

app.delete('/user/:id', async (req, res) => {
    try {
        const { id } = req.params; 
        const deletedUser = await Formmodel.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully', deletedUser });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});




app.listen(port,()=>{
    console.log(`server running on port ${port}`);
    
});
