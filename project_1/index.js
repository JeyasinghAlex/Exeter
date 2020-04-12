const express = require('express');
//const ejs = require('ejs');
const bodyparser = require('body-parser');
var app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({extended : true}));
//app.use(bodyparser.json());

app.get('/', (req, res)=>{
   // res.render('home');
   res.render('home');
});

app.post('/user',(req, res)=>{
    res.send(`Your name is - ${req.body.name} ,  your age is - ${req.body.age}`);
});

app.get('/about', (req,res)=>{
    var user1 = {name : "alex", age : 20}
    var user2 = {name : "sparrow", age : 22}
    res.json([user1, user2]);
});

const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log(`app running is port number - ${port}`);
});
