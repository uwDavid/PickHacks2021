const express = require('express');
const methodOverride = require('method-override')

const app = express();


const port = 5000; 

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method')); 

app.get('/*', (req, res)=>{
    res.send({playlist : [{name:'song1'}]}); 
})

app.listen(port, ()=>{
    console.log(`Listening on PORT: ${port}`); 
})