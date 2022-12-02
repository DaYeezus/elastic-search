const elasticClient = require("../config/elastic.config")

 async function getAllDices(req,res,next)  {
    try{
        const indices =  await elasticClient.indices.getAlias()
        const regex = /^\.+/
        return res.status(200).json({
            indices : Object.keys(indices).filter(item => !regex.test(item))
        })
    }catch (err){
        next(err)
    }
}

async function createNewDice(req,res,next)  {
    try{
        const {name} = req.body
        if(!name) {
            throw {message: "please enter a name for dice"}
        }
        const createdDice = await elasticClient.indices.create({index:name})
        return res.status(200).json({
            ...createdDice
        })
    }catch (err){
        next(err)
    }
}
async function getDice(req,res,next)  {
    try{
        const {name} = req.params
        if(!name) {
            throw {message: "please enter dice name"}
        }
        const dice = await elasticClient.indices.getAlias({index:name})
        return res.status(200).json({
            dice
        })
    }catch (err){
        next(err)
    }
}

module.exports = {getAllDices,createNewDice ,getDice}