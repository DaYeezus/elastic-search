const {Client} = require("@elastic/elasticsearch")
const {ELASTIC_PORT} = process.env
const elasticClient = new Client({
    node : "http://localhost:9200",
    auth: {
        username:'elastic',
        password :"7hmrExE8yMAk8eiA7v7k"
    },
    tls : {
        rejectUnauthorized:false
    }
})
module.exports = elasticClient