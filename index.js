import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

function getMonth(month) {
    var dict = {0: "January", 1: "February", 2: "March", 3: "April", 4: "May", 5: "June", 6: "July", 7: "August", 8: "September", 9: "September", 9: "October", 10: "November", 11: "December"};
    return dict[month];
}

function getWeekday(date) {
    var dict = {0: "Sunday", 1: "Monday", 2: "Tuesday", 3: "Wednesday", 4: "Thursday", 5: "Friday", 6: "Saturday"};
    return dict[date];
}

const date = new Date();
const tasksToday = [];
const tasksWork = [];

app.get("/", (req, res) => {
    res.render("index.ejs", {weekday: getWeekday(date.getDay()), month: getMonth(date.getMonth()), day: date.getDate(), displayItems: tasksToday, taskType: "Today's"});
  });

app.post("/submit", (req, res) => {
    if (req.body.newItem != ""){
        tasksToday.push(req.body.newItem);
        res.render("index.ejs", {weekday: getWeekday(date.getDay()), month: getMonth(date.getMonth()), day: date.getDate(), displayItems: tasksToday, taskType: "Today's"});
    }
    else {
        res.render("index.ejs", {weekday: getWeekday(date.getDay()), month: getMonth(date.getMonth()), day: date.getDate(), displayItems: tasksToday, taskType: "Today's"});
    }
});

app.get("/work", (req, res) => {
    res.render("work.ejs", {weekday: getWeekday(date.getDay()), month: getMonth(date.getMonth()), day: date.getDate(), displayItems: tasksWork, taskType: "Work"});
  });

app.post("/work", (req, res) => {
    if (req.body.newItem != ""){
        tasksWork.push(req.body.newItem);
        res.render("work.ejs", {weekday: getWeekday(date.getDay()), month: getMonth(date.getMonth()), day: date.getDate(), displayItems: tasksWork, taskType: "Work"});
    }
    else {
        res.render("work.ejs", {weekday: getWeekday(date.getDay()), month: getMonth(date.getMonth()), day: date.getDate(), displayItems: tasksWork, taskType: "Work"});
    }
    res.redirect("/work");
});

app.listen(port, () => {
    console.log(`Serving on port ${port}.`);
})