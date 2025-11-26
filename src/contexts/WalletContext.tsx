import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { BrowserProvider, JsonRpcSigner } from 'ethers';
import { useWeb3Modal, useWeb3ModalAccount, useWeb3ModalProvider } from '@web3modal/ethers/react';
import { toast } from '@/hooks/use-toast';

interface WalletContextType {
  account: string | null;
  signer: JsonRpcSigner | null;
  provider: BrowserProvider | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  isConnecting: boolean;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const { open } = useWeb3Modal();
  const { address, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  
  const [account, setAccount] = useState<string | null>(null);
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null);
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const connectWallet = async () => {
    try {
      setIsConnecting(true);
      await open();
    } catch (error: any) {
      toast({
        title: "Connection Failed",
        description: error?.message || "Failed to connect wallet",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = async () => {
    await open();
  };

  useEffect(() => {
    const updateWalletState = async () => {
      if (isConnected && address && walletProvider) {
        try {
          const ethersProvider = new BrowserProvider(walletProvider);
          const ethersSigner = await ethersProvider.getSigner();
          
          setAccount(address);
          setProvider(ethersProvider);
          setSigner(ethersSigner);
          
          toast({
            title: "Wallet Connected",
            description: `Connected to ${address.slice(0, 6)}...${address.slice(-4)}`,
          });
        } catch (error) {
          console.error('Error setting up wallet:', error);
        }
      } else {
        setAccount(null);
        setProvider(null);
        setSigner(null);
      }
    };

    updateWalletState();
  }, [isConnected, address, walletProvider]);

  return (
    <WalletContext.Provider value={{ account, signer, provider, connectWallet, disconnectWallet, isConnecting }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
