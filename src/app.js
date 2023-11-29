const express = require('express');
require("../src/db/conn");

const model = require('./models/schm')
const app = express()
const port = process.env.PORT || 3000

app.use(express.json());

app.post('/api/todos', async(req,res)=>{
    try{
        const add = new model(req.body)
        console.log(req.body);
        const result = await add.save();
        res.status(201).send(result)
        }
    catch(e){
        res.status(400).send({error:e.message});
    }
})


app.get('/api/todos', async(req,res)=>{
    try{
        const findd =await model.find({});//return promise
        res.status(201).send(findd);
        }
    catch(e){
        res.status(400).send(e);
    }
})


app.get('/api/todos/:id', async(req,res)=>{
    try{
        const _id = req.params.id;
        const findid =await model.findById({_id});//return promise
        res.status(201).send(findid);
        }
    catch(e){
        res.status(400).send(e);
    }
})


app.put('/api/todos/:id', async(req,res)=>{
    try{
        const _id = req.params.id;
        const findid =await model.findByIdAndUpdate(_id,req.body);//return promise
        res.status(201).send(findid);
        }
    catch(e){
        res.status(400).send({error:e.message});
    }
})

app.delete('/api/todos/:id', async(req,res)=>{
    try{
        const _id = req.params.id;
        const findid =await model.findByIdAndDelete(_id,req.body);//return promise
        res.status(201).send(findid);
        }
    catch(e){
        res.status(400).send(e);
    }
})


app.listen(port , () => {
    console.log("started")
})