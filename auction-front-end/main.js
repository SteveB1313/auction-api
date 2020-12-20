const bidsElement = document.querySelector('#bids');

const apiUrl = 'http://localhost:3000/bids';

async function fetchBids() {
    const response = await fetch('http://localhost:3000/bids');
    const json = await response.json();
    json.data.forEach((bid) => {
        const lineBreak = document.createElement('br');
        const user = document.createTextNode(bid.user + " - " + bid.bid);
        bidsElement.appendChild(user);
        bidsElement.appendChild(lineBreak);
        console.log(bid.user);
    })
}

fetchBids();

// wait for the DOM to be loaded
$(function() {
    // bind 'myForm' and provide a simple callback function
    $('#bidForm').ajaxForm(function() {
      setTimeout(function () { window.location.reload(); }, 1);
      alert("Thank you for your bid.")
    });
  });