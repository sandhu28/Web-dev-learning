const express = require("express");
const bodyParser = require("body-parser");

const date = require(__dirname + "/date.js");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const mongoose = require("mongoose");

app.set("view engine", "ejs");

// mongoose.connect("mongodb://127.0.0.1:27017/todoListDB", {
//   useNewUrlParser: true,
// });
mongoose.connect(
  "mongodb+srv://sandhu:mongodb@cluster0.jicymuz.mongodb.net/todoListDB",
  {
    useNewUrlParser: true,
  }
);

const itemsSchema = {
  name: String,
};

const listSchema = {
  name: String,
  items: [itemsSchema],
};

const Item = mongoose.model("Item", itemsSchema);

const List = mongoose.model("List", listSchema);

const item1 = new Item({
  name: "Welcome to sandhu's toDoList",
});

const item2 = new Item({
  name: "Click + to add new item",
});

const item3 = new Item({
  name: "Check the box to delete an item",
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
      } else {
        res.render("list", { listType: day, newItem: ele });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/", function (req, res) {
  let itemName = req.body.newItem;
  let listType = req.body.list;

  const item4 = new Item({
    name: itemName,
  });

  List.find({ name: listType })
    .then((ele) => {
      if (ele.length == 0) {
        item4.save();
        res.redirect("/");
      } else {
        ele[0].items.push(item4);
        ele[0].save();
        res.redirect("/" + listType);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/delete", function (req, res) {
  const id = req.body.checkBox;
  const listName = req.body.ListType;
  console.log(listName);

  List.find({ name: listName })
    .then((ele) => {
      if (ele.length == 0) {
        Item.findByIdAndRemove(id)
          .then((del) => {
            console.log("Successfully deleted item");
            console.log(del);
          })
          .catch((err) => {
            console.log(err);
          });
        res.redirect("/");
      } else {
        List.findOneAndUpdate(
          { name: listName },
          { $pull: { items: { _id: id } } }
        )
          .then((del) => {
            console.log("Successfully deleted item");
            console.log(del);
          })
          .catch((err) => {
            console.log(err);
          });
        res.redirect("/" + listName);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/:typeOfList", function (req, res) {
  const listName = req.params.typeOfList;

  List.find({ name: listName })
    .then((ele) => {
      if (ele.length == 0) {
        console.log("does not exist");
        const list = new List({
          name: listName,
          items: defaultItems,
        });
        list.save();
        res.redirect("/" + listName);
      } else {
        res.render("list", { listType: ele[0].name, newItem: ele[0].items });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

// app.get("/work", function (req, res) {
//   res.render("list", { listType: "Work", newItem: workItems });
// });

// app.post("/work", function (req, res) {
//   res.redirect("/work");
// });

// app.get("/about", function (req, res) {
//   res.render("about");
// });

app.listen(process.env.PORT || 3000, (req, res) => {
  console.log("Server is running on port 3000");
});
