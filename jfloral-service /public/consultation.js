// Assuming you have input fields with IDs 'guests', 'men', and 'maids' in your HTML
const guestsInput = document.getElementById('guests');
const menInput = document.getElementById('men');
const maidsInput = document.getElementById('maids');

// Event listener for a button click (you might have a button that triggers this)
document.getElementById('generateButton').addEventListener('click', () => {
  const data = {
    guests: guestsInput.value,
    men: menInput.value,
    maids: maidsInput.value,
  };

  // Make a POST request to the server
  fetch('/estimate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then(result => {
      // Display the result in the #estimateResult span
      estimateResult.textContent = result.totalEstimate.toFixed(2);
    })
    .catch(error => {
      console.error('Error:', error);
    });
});

