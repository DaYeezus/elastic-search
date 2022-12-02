const {getBlogs, getBlogWithTitle, getBlogWithMultipleFields, createBlog, updateBlog, deleteBlog} = require("../controllers/blog.controller");
const router = require("express").Router()
router.get("/" , getBlogs)
router.get("/find" , getBlogWithMultipleFields)
router.get("/:title" , getBlogWithTitle)
router.post("/" , createBlog)
router.put("/" , updateBlog)
router.delete("/" , deleteBlog)
module.exports = {
    BlogRouter : router
}