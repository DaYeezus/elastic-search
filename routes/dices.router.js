const {getAllDices , createNewDice, getDice} = require("../controllers/dices.controller");
const router = require("express").Router()
router.get("/" , getAllDices)
router.get("/:name" , getDice)
router.post("/" , createNewDice)
module.exports = {DicesRouter : router}