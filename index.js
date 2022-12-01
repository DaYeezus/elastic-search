const express = require("express")
const http = require("http");
const cors = require("cors");
const expressEjsLayOuts = require("express-ejs-layouts")
const path = require("path");
const {ApplicationRouter} = require("./routes/router");
const app = express()
require("dotenv").config()
app.use(express.static(path.join(__dirname , "public")))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(expressEjsLayOuts)
app.use(cors({origin:"*"}))
app.use(ApplicationRouter)
app.use((req, res, next) => {
    return res.status(404).json({
        message : `Route ${req.path} not found`
    })
})
app.use((err, req, res, next) => {
    return res.status(err.status || 500).json({
        message : err.message || "Server Error"
    })
})
app.set("view engine" , "ejs")
app.set("layout" , path.join(__dirname,"views","layouts","master.ejs"))
http.createServer(app).listen(3000 , () => console.log("Running server on http://localhost:3000"))