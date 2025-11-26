import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react';

// Camp Network configuration
const campNetwork = {
  chainId: 325000, // Camp Network testnet chain ID
  name: 'Camp Network Testnet V2',
  currency: 'ETH',
  explorerUrl: 'https://camp-network-testnet.blockscout.com',
  rpcUrl: 'https://rpc-camp-network-4xje7wy105.t.conduit.xyz'
};

const metadata = {
  name: 'Herckerton Community Finance Hub',
  description: 'A community-powered savings and micro-lending platform',
  url: typeof window !== 'undefined' ? window.location.origin : '',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
};

// Create Web3Modal
export const modal = createWeb3Modal({
  ethersConfig: defaultConfig({ metadata }),
  chains: [campNetwork],
  projectId: 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6', // This can be any string for demo purposes
  enableAnalytics: false
});
