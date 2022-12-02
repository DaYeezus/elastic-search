const {DicesRouter} = require("./dices.router");
const {BlogRouter} = require("./blogs.router");
const router = require("express").Router()
router.use("/indices" , DicesRouter)
router.use("/blogs" , BlogRouter)
module.exports = {ApplicationRouter : router}