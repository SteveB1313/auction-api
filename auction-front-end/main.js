const bidsElement = document.querySelector('#bids');

const apiUrl = 'http://localhost:3000/bids';

async function fetchBids() {
    const response = await fetch('http://localhost:3000/bids');
    const json = await response.json();
    json.data.forEach((bid) => {
        const span = document.createElement('span');
        span.innerHTML = "<br>";
        const user = document.createTextNode(bid.user + " - " + bid.bid);
        bidsElement.appendChild(user);
        bidsElement.appendChild(span);
        console.log(bid.user);
    })
}

fetchBids();