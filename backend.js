const express = require('express');
const app = express();
const fs = require("fs")
const bodyParser = require("body-parser")
const ports = process.env.PORT || 5000 ;
// middlewares
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));

const filePath = "./database.json";
let jsonData = fs.readFileSync(filePath, "utf-8");
jsonData = JSON.parse(jsonData);

app.get("/:api", (req, res) => {
    if(req.params.api === "rdxcontact"){
        res.json(jsonData);
    }
    else{
        res.status(404).send("Error 404")
    }
})
let date = new Date();
app.post("/contact", (req, res) => {
    let data = {...req.body,date:`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`,time:`${date.getHours()}:${date.getMinutes()}/${date.getSeconds()}`};
    jsonData.push(data);
    fs.writeFileSync(filePath, JSON.stringify(jsonData));
    res.send("<h1> Response is saved. Rohan Dutta will reach you asap.<br><a href='http://192.168.1.109:3000'>Back to page</a></h1>");
})
app.listen(ports, () => { 
    console.log("Server is running.")
})