function displayEstimate() {
    var estimateResult = document.getElementById("estimateResult");
    var totalEstimate = estimate();
    estimateResult.textContent = totalEstimate.toFixed(2); // Display with two decimal places
  }


function estimate() {
    var guests = parseFloat(document.getElementById("guests").value);
    var groomsmen = parseFloat(document.getElementById("men").value);
    var bridesmaids = parseFloat(document.getElementById("maids").value);
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
  

  
  