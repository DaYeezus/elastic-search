const elasticClient = require("../config/elastic.config");

async function getBlogs(req,res,next){
    try{

        const blogs = await elasticClient.search({
            index : "blog",
        })
        return res.status(200).json({
            blogs : blogs.hits.hits
        })
    }catch (err){
        next(err)
    }
}
async function getBlogWithTitle(req,res,next){
    try{
        const {title} = req.params
        if(!title) return res.status(401).json({message :"please insert a title"})
        const blog = await elasticClient.search({
            index :"blog",
            query : {
                match : {
                    title :title
                }
            }
        })
        return res.status(200).json({
            blog : blog.hits.hits
        })
    }catch (err){
        next(err)
    }
}

async function getBlogWithMultipleFields(req,res,next){
    try{
        const {search} = req.query
        if(!search) return res.status(401).json({message: "please provide a search query"})
        const result = await elasticClient.search({
            index : "blog",
            query : {
                bool : {
                    should : [
                        {
                            regexp : {title : `.*${search}.*`}
                        },
                        {
                            regexp : {author : `.*${search}.*`}
                        },
                        {
                            regexp : {content : `.*${search}.*`}
                        }
                    ]
                }
            }
        })
        return res.status(200).json({result: result.hits})
    }catch (err){
        next(err)
    }
}

async function createBlog(req,res,next){
    try{
        const {title,content,author} = req.body;
        if(!title || !content || !author){
            return res.status(401).json({
                message : "Creating blog needs title,content and author please enter all of them"
            })
        }
        const createdBlog = await elasticClient.index({
            index : "blog",
            document : {title,content,author}
        })
        return res.status(200).json({
            createdBlog
        })
    }catch (err){
        next(err)
    }
}

async function updateBlog(req,res,next){
    try{
        const {id} = req.params
        if(!id) return res.status(401).json({message : "Please enter a valid id"})
        const data = req.body
        Object.keys(data).forEach(key => {
            if(!data[key]) delete data[key]
        })
        const result = await elasticClient.update({
            index :"blog",
            id,
            doc:data
        })
        return res.status(200).json({result : result.result})
    }catch (err){
        next(err)
    }
}

async function deleteBlog(req,res,next){
    try{
        const {id} = req.params;
        if(!id) return res.status(401).json({message : "Please enter a valid id"})
        const result = await elasticClient.deleteByQuery({
            index: "blog",
            query: {
                match: {
                    _id: id
                }
            }
        })
        return res.status(200).json({result});
    }catch (err){
        next(err)
    }
}

module.exports = {
    createBlog,
    deleteBlog,
    updateBlog,
    getBlogs,
    getBlogWithTitle,
    getBlogWithMultipleFields

}