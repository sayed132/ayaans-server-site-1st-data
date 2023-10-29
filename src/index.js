const express = require('express');

const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req,res)=>{
    return res.status(200).send({message: "your api is fully available", status:true})
})

module.exports = app;