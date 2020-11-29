let MongoClient = require('mongodb').MongoClient;
let url = "mongodb://localhost:27017/";

function createAccountsDatabase () {

	MongoClient.connect(url, (err, db) => {
		if (err) throw err;
		let dbo = db.db("celtra");
		let entries =  [{
			accountId : 1,
			accountName : 'janez',
			isActive: true
		},
		{
			accountId : 2,
			accountName : 'miha',
			isActive: false
		}];
		let count = 0;
		entries.forEach ((element) => {
			dbo.collection("accounts").insertOne(element, function(err, res) {
			if (err) throw err;
			})
			count ++
		});
		console.log("Database " + dbo.s.databaseName + " created and " + count + " documents inserted");
		db.close();
	});
}

createAccountsDatabase ();