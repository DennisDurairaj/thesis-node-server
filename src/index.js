import express from "express";
import path from "path";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:3000" }));

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

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(9000, () => console.log("Running on 9000"));
