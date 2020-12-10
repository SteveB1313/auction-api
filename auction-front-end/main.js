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