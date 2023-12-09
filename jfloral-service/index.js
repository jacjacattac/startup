const express = require('express');
const app = express();
const DB = require('./database.js');

const port = process.argv.length > 2 ? process.argv[2] : 3000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);


// Endpoint to handle the estimate calculation
apiRouter.post('/estimate', (req, res) => {
  const { guests, men, maids } = req.body;
  const totalEstimate = estimate(guests, men, maids);
  const responseJSON = {
    totalEstimate: totalEstimate.toFixed(2),
  };
  // Adding this line to test 
  DB.addEstimate(responseJSON);
  
  res.json({ totalEstimate: totalEstimate.toFixed(2) });
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: './jfloral-service/public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// Function to estimate costs based on input data
function estimate(guests, groomsmen, bridesmaids) {
  let total = 0;

  if (!isNaN(guests) && guests >= 1) {
    total += guests * 20;
  }
  if (!isNaN(groomsmen) && groomsmen >= 1) {
    total += groomsmen * 15;
  }
  if (!isNaN(bridesmaids) && bridesmaids >= 1) {
    total += bridesmaids * 50;
  }

  return total;
}

