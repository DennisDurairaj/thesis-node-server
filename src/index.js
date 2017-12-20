import express from "express";
import path from "path";
import bodyParser from "body-parser";
import cors from "cors";
import mongo from "mongodb";
import monk from 'monk';
const app = express();

const db = monk("mongodb://dennis:dennis@ds121336.mlab.com:21336/bookstore")

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:3000" }));
app.use(function(req,res,next){
  req.db = db;
  next();
});

function fibonacci() {
  var a = 1,
    b = 0,
    num = 1400,
    temp;

  while (num >= 0) {
    temp = a;
    a = a + b;
    b = temp;
    num--;
  }

  return b;
}

app.get("/api/fibonacci", (req, res) => {
  var result = fibonacci();
  console.log(result);
  res.status(200).json({ result });
});

app.get("/api/bookstore", (req, res) => {
  var db = req.db;
  var collection = db.get('books');
  collection.find({},{},function(e,docs){
      res.send(docs);
  });
})

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(9000, () => console.log("Running on 9000"));
