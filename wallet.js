// wallet.js
const express = require('express');
const router = express.Router();
const { ethers } = require('ethers');

// Endpoint to verify wallet signature
router.post('/verify-wallet', async (req, res) => {
    console.log('Received request to verify wallet:', req.body); // Log the request body
    const { message, signature, address } = req.body;

    try {
        // Verify the signature
        const recoveredAddress = ethers.utils.verifyMessage(message, signature);
        if (recoveredAddress.toLowerCase() === address.toLowerCase()) {
            res.json({ success: true, message: 'Wallet verified successfully!' });
        } else {
            res.status(401).json({ success: false, message: 'Invalid signature.' });
        }
    } catch (error) {
        console.error('Error verifying wallet:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
});

module.exports = router;