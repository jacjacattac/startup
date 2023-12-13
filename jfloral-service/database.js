const { MongoClient } = require ('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('estimates');
const estimateCollection = db.collection('totalCost');
const userCollection = db.collection('user');


// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

async function getUser(email) {
  const user = await userCollection.findOne({ email: email });
  return user;
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function createUser(email, password) {
  // Hash the password before we insert it into the database
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
  };
  await userCollection.insertOne(user);

  return user;
}


async function addEstimate(estimate) {
    const result = await estimateCollection.insertOne(estimate);
    console.log('Estimate added successfully:', result);
  return result;
}

async function getEstimationCount() {
  try {
    // Use the countDocuments method to get the count of documents in the collection
    const count = await estimateCollection.countDocuments();
    return count;
  } catch (error) {
    console.error('Error getting estimation count:', error);
    throw error;
  }
}


module.exports = { 
  getUser,
  getUserByToken,
  createUser,
  addEstimate, 
  getEstimationCount
};

