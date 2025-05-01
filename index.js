// index.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const otpRoutes = require('./otp');
app.use('/api/otp', otpRoutes); // Use a unique path for OTP routes

const walletRoutes = require('./wallet');
app.use('/api/wallet', walletRoutes); // Use a unique path for wallet routes

const path = require('path');
app.use(express.static(path.join(__dirname, 'public'))); // Assuming your HTML file is in a 'public' folder

// Basic health check
app.get('/', (req, res) => {
  res.send('API is working 👋');
});

// Placeholder for wallet and OTP routes
// You'll add: /verify-wallet and /send-otp later

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
