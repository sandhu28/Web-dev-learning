const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine','ejs');

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

app.get('/', (req, res) => {

    const date = new Date();
    const dayNo = date.getDay();

    const day = daysOfWeek[dayNo];

    res.render("list",{dayOfWeek: day});

})

app.listen(3000, (req,res)=>{
    console.log('Server is running on port 3000');
})