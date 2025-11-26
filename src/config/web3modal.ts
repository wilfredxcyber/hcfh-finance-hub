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

// Create Ethers config with Coinbase disabled to avoid cross-origin issues
const ethersConfig = defaultConfig({
  metadata,
  enableCoinbase: false, // Disable Coinbase to prevent cross-origin security errors
  enableInjected: true,
  enableEIP6963: true,
  rpcUrl: 'https://rpc-camp-network-4xje7wy105.t.conduit.xyz',
  defaultChainId: 325000
});

// Create Web3Modal
export const modal = createWeb3Modal({
  ethersConfig,
  chains: [campNetwork],
  projectId: 'ab710bb1bf0a4c3ac37c0003ee27e273',
  enableAnalytics: false,
  enableOnramp: false
});
