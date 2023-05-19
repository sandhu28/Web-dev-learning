const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/fruitsDB",{useNewUrlParser:true});

const fruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max:10
    },
    review: String
});

// creates Fruits collection following fruitSchema
const Fruit = mongoose.model("Fruit",fruitSchema);

// const fruit = new Fruit({
//     name : "Apple",
//     rating: 7, 
//     review: "An apple a day keeps doctor away."
// })
const fruit = new Fruit({
    name : "mango",
    rating:  10,
    review: "fav fruit"
})

fruit.save();

// Fruit.updateOne({_id: "646788542c4d5029e4130ee5"},{name:"Peach"})
//     .then(result => {
//         console.log('Update successful:', result);
//     })
//     .catch(error => {
//     console.error('Error while updating:', error);
//     });

// Fruit.deleteOne({_id: "646788542c4d5029e4130ee5"})
//     .then(result => {
//         console.log('Delete successful:', result);
//     })
//     .catch(error => {
//     console.error('Error while Deleting:', error);
//     });

const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    fruitLink: fruitSchema
});

const Person = mongoose.model("Person",personSchema);

const person = new Person({
    name: "Awry",
    age: 35,
    fruitLink: fruit
});

Person.updateOne({name:'John'},{fruitLink:fruit})
    .then((res)=>{
        console.log("Updated successfully");
    })
    .catch((err)=>{
        console.log("Error found");
    })

const fruits = [
    {
      name: "Apple",
      rating: 7,
      review: "An apple a day keeps the doctor away."
    },
    {
      name: "Orange",
      rating: 8,
      review: "Delicious and juicy citrus fruit."
    },
    {
      name: "Banana",
      rating: 9,
      review: "Great source of potassium."
    }
  ];
  
// Fruit.insertMany(fruits);

// person.save();

// Person.deleteMany({name: "John"})
//     .then(result => {
//         console.log('Delete successful:', result);
//     })
//     .catch(error => {
//         console.error('Error while Deleting:', error);
//     });

// console.log("sukhi ");


const ret = Fruit.find({}).exec();
console.log(ret);
// setTimeout(() => {
//     // Code to be executed after the delay
//     console.log("Time gone");
// }, 1000); // 3000 milliseconds = 3 seconds

ret
.then((res)=>{
    res.forEach((fruit)=>{
        console.log(fruit.name);
    })
    // close mongoose connection
    // mongoose.connection.close();
})
.catch((err)=>{
    console.log(err);
})


