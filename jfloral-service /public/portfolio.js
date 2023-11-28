const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

// Serve static files (CSS, images, etc.)
app.use(express.static('public'));

// Define an endpoint for rendering the HTML page
app.get('/', async (req, res) => {
  try {
    // Get Instagram user ID from the Instagram username
    const userId = await getInstagramUserId('jfloralcompany'); // Replace 'instagram' with the desired username

    // Get recent media from the user's profile
    const media = await getRecentMedia(userId);

    // Render the HTML page with the embedded media
    res.send(renderPage(media));
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Helper function to get Instagram user ID from username
async function getInstagramUserId(username) {
  const response = await axios.get(`https://graph.instagram.com/v13.0/v1.0/username=${username}?fields=id&access_token=YOUR_ACCESS_TOKEN`);
  return response.data.id;
}

// Helper function to get recent media from a user's profile
async function getRecentMedia(userId) {
  const response = await axios.get(`https://graph.instagram.com/v13.0/${userId}/media?fields=id,media_type,thumbnail_url,permalink,caption&access_token=YOUR_ACCESS_TOKEN`);
  return response.data.data;
}

// Helper function to render the HTML page with embedded media
function renderPage(media) {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Instagram Embedded Profile</title>
    </head>
    <body>
      <h1>Instagram Profile</h1>
      <div>
        ${media.map(renderMedia).join('')}
      </div>
    </body>
    </html>
  `;
  return html;
}

// Helper function to render individual media
function renderMedia(item) {
  return `
    <div>
      <img src="${item.thumbnail_url}" alt="${item.caption}">
      <p>${item.caption}</p>
      <a href="${item.permalink}" target="_blank">View on Instagram</a>
    </div>
  `;
}
