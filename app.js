// app.js

document.getElementById('connectWallet').onclick = async () => {
    if (typeof window.ethereum !== 'undefined') {
        try {
            // Request account access
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const account = accounts[0]; // Get the first account

            // Define the message to be signed
            const message = 'Please sign this message to verify your identity for voting.';

            // Request the user to sign the message
            const signature = await window.ethereum.request({
                method: 'personal_sign',
                params: [message, account],
            });

            // Send the signature to the server for verification
            const response = await fetch('/api/wallet/verify-wallet', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: message,
                    signature: signature,
                    address: account,
                }),
            });

            const result = await response.json();
            if (result.success) {
                alert('Wallet verified successfully!');
                // Proceed with voting logic
                // Example: castVote(candidateId);
            } else {
                alert('Failed to verify wallet: ' + result.message);
            }
        } catch (error) {
            console.error('Error connecting to MetaMask:', error);
            alert('Error connecting to MetaMask. Please try again.');
        }
    } else {
        alert('Please install MetaMask!');
    }
};

// Example voting logic function
function castVote(candidateId) {
    // Assuming you have a contract instance set up
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    contract.vote(candidateId)
        .then((transaction) => {
            console.log('Vote cast successfully:', transaction);
            alert('Your vote has been recorded!');
        })
        .catch((error) => {
            console.error('Error casting vote:', error);
            alert('There was an error casting your vote. Please try again.');
        });
}