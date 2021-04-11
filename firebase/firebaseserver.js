const express = require('express');
// const path = require('path');
const app = express();
// const http = require('http').Server(app);
// const io = require('socket.io')(http);

const port = 5000; 

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Testing
app.use(express.static(path.join(__dirname, 'public')));

app.get('/getSongs', (req, res)=>{
    res.send({playlist : [{name:'song1'}]}); 
}); 

//Production
// app.use(express.static(path.join(__dirname, 'build')));
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
//   });

app.post('/request', (req, res)=>{
    // logic
})

app.listen(port, ()=>{

    console.log(`Listening on PORT: ${port}`); 
})
