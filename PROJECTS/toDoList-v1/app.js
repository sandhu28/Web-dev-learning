const express = require("express");
const bodyParser = require("body-parser");

const date = require(__dirname + "/date.js");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const mongoose = require("mongoose");

app.set("view engine", "ejs");

mongoose.connect("mongodb://127.0.0.1:27017/todoListDB", {
  useNewUrlParser: true,
});

const itemsSchema = {
  name: String,
};

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
  name: "Welcome to sandhu's toDoList",
});

const item2 = new Item({
  name: "Click + to add new item",
});

const item3 = new Item({
  name: "Hit <-- to delete an item",
});

const defaultItems = [item1, item2, item3];

app.get("/", (req, res) => {
  const day = date.getDate();

  // search for all the documents inside the Items collection
  Item.find({})
    // ele is an array of all document objects
    .then((ele) => {
      if (ele.length == 0) {
        Item.insertMany(defaultItems)
          .then((ele) => {
            console.log("Successfully saved default items to DB");
          })
          .catch((err) => {
            console.log(err);
          });
        res.redirect("/");
      }
      else{
        res.render("list", { listType: day, newItem: ele });
      }
      
    })
    .catch((err) => {
      console.log(err);
    });

});

app.post("/", function (req, res) {
  let itemName = req.body.newItem;

  const item4 = new Item({
    name : itemName
  })

  item4.save();

  res.redirect("/");

//   if (req.body.list === "Work") {
//     workItems.push(item);
//     res.redirect("/work");
//   } else {
//     items.push(item);
//     res.redirect("/");
//   }
});

app.get("/work", function (req, res) {
  res.render("list", { listType: "Work", newItem: workItems });
});

app.post("/work", function (req, res) {
  res.redirect("/work");
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(3000, (req, res) => {
  console.log("Server is running on port 3000");
});
