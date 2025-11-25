# HCFH - Herckerton Community Finance Hub

A decentralized finance (DeFi) platform built with React, TypeScript, and Ethers.js. Connect your wallet to access savings and borrowing features with competitive interest rates.

## Features

- **Wallet Integration**: Seamless MetaMask connection with account management
- **Savings**: Deposit crypto assets and earn competitive APY (currently 5.25%)
- **Borrowing**: Borrow against your crypto collateral with transparent interest rates (6.75%)
- **Dashboard**: Real-time overview of your balances, savings, loans, and interest earned
- **Responsive Design**: Beautiful, mobile-friendly interface with modern DeFi aesthetics

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn-ui components
- **Web3**: Ethers.js v6 for blockchain interaction
- **Routing**: React Router v6
- **State Management**: TanStack Query

## Getting Started

### Prerequisites

- Node.js & npm ([install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating))
- MetaMask browser extension

### Installation

```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to the project directory
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm i

# Start development server
npm run dev
```

The app will be available at `http://localhost:8080`

## Usage

1. Click "Connect Wallet" to connect your MetaMask wallet
2. Navigate to **Dashboard** to view your portfolio overview
3. Visit **Savings** to deposit funds and earn interest
4. Visit **Borrowing** to take loans against your collateral

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── Layout.tsx   # Main layout with navigation
│   └── ui/          # shadcn-ui components
├── contexts/        # React context providers
│   └── WalletContext.tsx  # Wallet connection state
├── pages/          # Route pages
│   ├── Dashboard.tsx
│   ├── Savings.tsx
│   └── Borrowing.tsx
└── App.tsx         # Main app component
```

## Development

### Edit with Lovable

Visit the [Lovable Project](https://lovable.dev/projects/ce6568e1-880d-4b25-a1a5-016fb8db774d) and start prompting. Changes made via Lovable will be committed automatically to this repo.

### Local Development

Make changes locally and push to GitHub. Pushed changes will also be reflected in Lovable thanks to bidirectional sync.

## Deployment

### Frontend Deployment

1. Open [Lovable](https://lovable.dev/projects/ce6568e1-880d-4b25-a1a5-016fb8db774d)
2. Click **Publish** (top right on desktop, bottom right on mobile)
3. Click **Update** to deploy your latest changes

### Custom Domain

Connect a custom domain via Project > Settings > Domains. [Learn more](https://docs.lovable.dev/features/custom-domain#custom-domain)

## Smart Contract Integration

This frontend is ready for smart contract integration. Key integration points:

- `src/contexts/WalletContext.tsx` - Wallet connection management
- `src/pages/Savings.tsx` - Deposit/withdrawal handlers
- `src/pages/Borrowing.tsx` - Borrow/repay handlers

Replace the placeholder toast notifications with actual contract calls using Ethers.js.

## Contributing

This project uses:
- ESLint for code linting
- TypeScript for type safety
- Tailwind CSS for styling

## License

MIT

## Resources

- [Lovable Documentation](https://docs.lovable.dev/)
- [Ethers.js Documentation](https://docs.ethers.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn-ui](https://ui.shadcn.com/)
