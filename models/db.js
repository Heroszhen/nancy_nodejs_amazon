const config = require("./config").config;
const MongoClient = require('mongodb').MongoClient;
const uri = config[0];
exports.client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true,useUnifiedTopology: true});