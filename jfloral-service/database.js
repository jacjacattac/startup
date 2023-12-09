const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');
async function main(){
const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('estimates');
const estimateCollection = db.collection('totalCost');

// const db = client.db('rental');
//   const collection = db.collection('house');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});


const house = {
  name: 'Beachfront views',
  summary: 'From your bedroom to the beach, no shoes required',
  property_type: 'Condo',
  beds: 1,
};

async function addEstimate(estimate) {
      const result = await estimateCollection.insertOne(estimate);
  return result;
}
// await collection.insertOne(house);


module.exports = { addEstimate };

}
main().catch(console.error);