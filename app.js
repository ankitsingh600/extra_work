const express = require ("express")
const axios = require("axios")
const mongoose = require("mongoose")
const user = require("./routes/user")

const app = express()

const port = 3000

mongoose.connect('mongodb://localhost:27017/test', {
  socketTimeoutMS: 1000,
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(()=>{
    console.log("connected to mognodb")
}).catch((error)=>{
    console.log("Error connecting to mongodb", error)
});

app.use(express.json())
app.set("views", "./views")
app.set("view engine", "html")
app.engine('html', require('ejs').renderFile);

app.get("/",(req,res)=>{
    res.render("index")
})

app.get("/broker", async(req,res)=>{
    try {
        const response = await axios.get('https://broker-api.sandbox.alpaca.markets/v1/assets', {
          headers: {
            'Authorization': 'Bearer Q0tMSzJPSThCUU1DV0VSUUxFMEg6THlZQXlyb0lsZUV1QjZnOHRWY0ZjbnN2VTdBS0xYU1d0NDBGVUNiZQ=='
          }
        });
        return response.data;
      } catch (error) {
        console.log(error.response.data)
        throw new Error("There is some problem in fetching data");
      }
})
app.use("/user", user)


app.listen(port,()=>{
    console.log("listening to this port 3000")
})

