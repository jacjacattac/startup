import { MongoClient } from 'mongodb';
import { hash } from 'bcrypt';
import { v4 } from 'uuid';
import { userName, password as _password, hostname } from './dbConfig.json';

const url = `mongodb+srv://${userName}:${_password}@${hostname}`;
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

function getUser(email) {
  return userCollection.findOne({ email: email });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function createUser(email, password) {
  // Hash the password before we insert it into the database
  const passwordHash = await hash(password, 10);

  const user = {
    email: email,
    password: passwordHash,
    token: v4(),
  };
  await userCollection.insertOne(user);

  return user;
}


async function addEstimate(estimate) {
    const result = await estimateCollection.insertOne(estimate);
    console.log('Estimate added successfully:', result);
  return result;
}


export default { 
  getUser,
  getUserByToken,
  createUser,
  addEstimate, 
};

