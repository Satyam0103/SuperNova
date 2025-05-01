const express = require('express');
const router = express.Router();

const otpStore = {}; // In-memory store (you can replace with Redis or DB for production)

// Generate a random 6-digit OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// POST /generate-otp
router.post('/generate-otp', (req, res) => {
  console.log('Received request to generate OTP:', req.body); // Log the request body
  const { phone } = req.body;

  // Validate phone number
  if (!phone) {
    console.log('No phone number provided');
    return res.status(400).json({ error: 'Phone number is required' });
  }

  const otp = generateOTP();
  otpStore[phone] = otp;

  // Simulate SMS send (in real case, integrate with Twilio or Fast2SMS)
  console.log(`Generated OTP for ${phone}: ${otp}`);

  // Here you would normally send the OTP via SMS
  // For now, we just log it
  res.json({ success: true, message: 'OTP sent (mock)' });
});

// POST /verify-otp
router.post('/verify-otp', (req, res) => {
  console.log('Received request to verify OTP:', req.body); // Log the request body
  const { phone, otp } = req.body;

  // Validate input
  if (!phone || !otp) {
    console.log('Phone number or OTP not provided');
    return res.status(400).json({ error: 'Phone number and OTP are required' });
  }

  // Check if the OTP is valid
  if (otpStore[phone] === otp) {
    delete otpStore[phone]; // Remove OTP after successful verification
    console.log(`OTP verified for ${phone}`);
    res.json({ success: true, message: 'OTP verified' });
  } else {
    console.log(`Invalid OTP for ${phone}`);
    res.status(401).json({ success: false, message: 'Invalid OTP' });
  }
});

// Export the router
module.exports = router;