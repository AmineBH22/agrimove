const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // Allow requests from your React frontend
app.use(express.json()); // Parse JSON bodies

// Example API endpoint
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Node.js backend!' });
});

// Example POST endpoint
app.post('/api/requests', (req, res) => {
  // Here you would handle saving a request to a database
  res.json({ status: 'Request received', data: req.body });
});

const PORT = 4000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
let marketplaceListings = [];

app.post('/api/marketplace', (req, res) => {
  const listing = { ...req.body, id: Date.now().toString(), timeOfOffer: new Date(), status: 'available' };
  marketplaceListings.push(listing);
  res.json(listing);
});

app.get('/api/marketplace', (req, res) => {
  res.json(marketplaceListings);
});