const {Client} = require("@elastic/elasticsearch")
const {ELASTIC_PORT} = process.env
const elasticClient = new Client({
    node : ELASTIC_PORT,
})
module.exports = elasticClient