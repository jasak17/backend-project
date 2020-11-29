let MongoClient = require('mongodb').MongoClient;
let url = "mongodb://localhost:27017/";


function dropStoreDatabase() {

    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        let dbo = db.db("celtraProject");
        dbo.dropDatabase((err, delOK) => {
            if (err) throw err;
            if (delOK) console.log("Database " + dbo.s.databaseName + " deleted");
            db.close();
        });
    });
}

dropStoreDatabase();
