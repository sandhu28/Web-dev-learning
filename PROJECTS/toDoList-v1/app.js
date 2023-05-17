const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

app.set('view engine','ejs');


const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

let items = ['Buy Food',"Cook Food","Eat Food"];
let workItems = [];

app.get('/', (req, res) => {

    const date = new Date();
    const options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    };

    const day = date.toLocaleDateString('en-US',options);

    res.render("list",{listType: day,newItem: items});

})

app.post('/',function(req,res){
    
    let item = req.body.newItem;

    if(req.body.list === 'Work'){
        workItems.push(item);
        res.redirect('/work');
    }
    else{
        items.push(item);
        res.redirect("/");
    }
    
})

app.get('/work',function(req,res){
    res.render('list',{listType: "Work",newItem: workItems});
})

app.post('/work',function(req,res){
    
    res.redirect('/work');
})

app.get('/about',function(req,res){
    res.render('about');
})

app.listen(3000, (req,res)=>{
    console.log('Server is running on port 3000');
})