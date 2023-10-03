const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");
const app = express();
 
app.set('view engine', 'ejs');
 
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
 
mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true});

function getMonth(month) {
    var dict = {0: "January", 1: "February", 2: "March", 3: "April", 4: "May", 5: "June", 6: "July", 7: "August", 8: "September", 9: "September", 9: "October", 10: "November", 11: "December"};
    return dict[month];
}

function getWeekday(date) {
    var dict = {0: "Sunday", 1: "Monday", 2: "Tuesday", 3: "Wednesday", 4: "Thursday", 5: "Friday", 6: "Saturday"};
    return dict[date];
}

const date = new Date();
const displayDate = `${getWeekday(date.getDay())}, ${getMonth(date.getMonth())} ${date.getDate()}`;
 
const itemsSchema = new mongoose.Schema({
  name: String
});
 
const Item = mongoose.model("Item", itemsSchema);

const listSchema = {
    name: String,
    items: [itemsSchema]
}

const List = mongoose.model("List", listSchema);

app.get("/", function(req, res) {
    Item.find({})
    .then(function(foundItems){
        res.render("index.ejs", {displayDate: displayDate, listTitle: "Home", newListItems: foundItems});
    })
    .catch(function(err){
        console.log(err);
    });
});

app.post("/delete", async function(req, res) {
    const checkedItemId = req.body.checkbox;
    const listName = req.body.listName;
    if (listName === "Home"){
        await Item.findByIdAndRemove(checkedItemId);
        res.redirect("/");
    }
    else {
        await List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: `${checkedItemId}`}}})
            .then(foundList => {
            foundList.save();
            res.redirect("/" + listName);    
            });
    } 
});
 
app.post("/", async function(req, res){
    const itemName = req.body.newItem;
    const listName = req.body.list;

    const newItem = new Item({
        name: req.body.newItem
    });
    
    if (listName === "Home"){
        newItem.save()
        res.redirect("/");
    }
    else {
        await List.findOne({name: listName})
            .then(foundList => {
                
            foundList.items.push(newItem);
            foundList.save();
            res.redirect("/" + listName);    
            });
    }
});

app.get("/:customListName", function(req, res){
    const customListName = req.params.customListName;
    const listTitle = _.capitalize(customListName);
   
    List.findOne({name: customListName})
      .then(foundList => {
        if(!foundList){
   
          const list = new List({
            name: customListName,
            items: []
          });
          list.save();
          res.redirect("/" + listTitle);
        } else {
            res.render("index", {displayDate: displayDate, listTitle: listTitle, newListItems: foundList.items});
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });

app.listen(3000, function() {
  console.log("Server started on port 3000");
});