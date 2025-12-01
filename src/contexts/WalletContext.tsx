import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { BrowserProvider, JsonRpcSigner } from 'ethers';
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
  const [account, setAccount] = useState<string | null>(null);
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null);
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const connectWallet = async () => {
    if (typeof window.ethereum === 'undefined') {
      toast({
        title: "Wallet Not Detected",
        description: "Please install MetaMask or open this app in a new tab to connect your wallet",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsConnecting(true);
      const ethersProvider = new BrowserProvider(window.ethereum);
      const accounts = await ethersProvider.send("eth_requestAccounts", []);
      const ethersSigner = await ethersProvider.getSigner();
      
      setAccount(accounts[0]);
      setProvider(ethersProvider);
      setSigner(ethersSigner);
      
      toast({
        title: "Wallet Connected",
        description: `Connected to ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`,
      });
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

  const disconnectWallet = () => {
    setAccount(null);
    setProvider(null);
    setSigner(null);
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected",
    });
  };

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnectWallet();
        } else {
          setAccount(accounts[0]);
        }
      };

      const handleChainChanged = () => {
        window.location.reload();
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, []);

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
