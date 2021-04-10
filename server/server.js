const express = require('express');
const app = express();

const port = 3000; 

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method')); 

app.get('/*', (req, res)=>{
    res.send({playlist : [{name:'song1'}]}); 
})

app.listen(port, ()=>{
    console.log("Listening on PORT:3000..."); 
})