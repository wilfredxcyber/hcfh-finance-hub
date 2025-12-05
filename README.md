Fortress X — Decentralized Savings & Micro-Lending Protocol (Camp Testnet)

Fortress X is a lightweight DeFi protocol built to provide secure token savings, collateral-backed borrowing, and transparent micro-loans for low-income earners and micro-entrepreneurs. All lending operations are handled by smart contracts on the Camp Testnet.



Key Features
	•	Tokenized savings vault
	•	Collateral-backed borrowing
	•	Fair and transparent on-chain micro-lending
	•	Simple and efficient contract architecture



Project Architecture

Smart Contracts
	•	Token.sol — Custom ERC-20 token
	•	Vault.sol — Handles deposits and withdrawals
	•	Lending.sol — Borrowing, repayment, and collateral mechanics

Tech Stack
	•	Solidity (Remix IDE)
	•	Camp Testnet
	•	React + Vite
	•	Ethers v6



Deployment Guide
	1.	Deploy Token.sol
	2.	Deploy Vault.sol
	•	Constructor parameter: tokenAddress
	3.	Deploy Lending.sol
	•	Constructor parameters: vaultAddress, tokenAddress
	4.	Mint test tokens to your wallet



Manual Testing

Deposits
	•	Call approve(token, amount)
	•	Call vault.deposit(amount)

Withdrawals
	•	Call vault.withdraw(amount)

Borrowing
	•	Ensure collateral is deposited
	•	Call lending.borrow(amount)

Repayment
	•	Call approve(token, repayAmount)
	•	Call lending.repay(repayAmount)



Frontend Setup

npm install
npm run dev

Environment Variables (.env)

VITE_TOKEN_ADDRESS=
VITE_VAULT_ADDRESS=
VITE_LENDING_ADDRESS=

Frontend Features
	•	Connect wallet
	•	Deposit and withdraw
	•	Borrow and repay



AI Integration Roadmap
	•	Borrower risk scoring
	•	Loan recommendation engine
	•	Default prediction
	•	Fraud detection
	•	Yield optimization



Project Roadmap
	•	MVP development
	•	AI feature expansion
	•	DAO governance integration



License

MIT License




