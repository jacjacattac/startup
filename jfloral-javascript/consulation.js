function estimate() {
    // Get the input values from the fields
    var guests = document.getElementById("guests").value;
    var groomsmen = document.getElementById("men").value;
    var bridesmaids = document.getElementById("maids").value;
    let total = 0;
  
    if (guests >= 1) {
        total += (guests * 20)
    }
    if (groomsmen >= 1) {
        total += (groomsmen * 15)
    }
    if (bridesmaids >= 1) {
        total += (bridesmaids * 50)
    }
    return total;
  }
  