const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('estimates');
const estimateCollection = db.collection('totalCost');



// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

function addEstimate(estimate) {
    const result = estimateCollection.insertOne(estimate);
    console.log('Estimate added successfully:', result);
  return result;
}


module.exports = { addEstimate };

