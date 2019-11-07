const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Database Name
const dbName = 'dice';

// Connection URL Without username and password
const url = 'mongodb://localhost:27017';

// Connection URL With username and password
// const url = 'mongodb://user:password@localhost:27017';

var _db;

MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
	assert.equal(null, err);
	console.log("Connected successfully to mongodb server");
	client.db(dbName);
   _db = client;
});


function get(){
    return _db;
}

function close(){
    _db.close();
}

module.exports = {
    get,
    close
};