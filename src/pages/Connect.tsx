import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '@/contexts/WalletContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Wallet, ExternalLink } from 'lucide-react';

const Connect = () => {
  const { account, connectWallet, isConnecting } = useWallet();
  const navigate = useNavigate();
  const [isEthereumAvailable, setIsEthereumAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if ethereum is available after component mounts
    setIsEthereumAvailable(typeof window.ethereum !== 'undefined');
  }, []);

  useEffect(() => {
    if (account) {
      navigate('/dashboard');
    }
  }, [account, navigate]);

  const handleOpenInNewTab = () => {
    const currentUrl = window.location.href;
    window.open(currentUrl, '_blank');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl font-bold">Connect Your Wallet</CardTitle>
          <CardDescription className="text-base">
            Connect your wallet to access Fortress X.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {isEthereumAvailable === false ? (
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20 text-center">
                <p className="text-sm text-amber-600 dark:text-amber-400 mb-2">
                  MetaMask is not accessible in this preview window.
                </p>
                <p className="text-xs text-muted-foreground">
                  Click below to open in a new tab where MetaMask can connect.
                </p>
              </div>
              <Button
                onClick={handleOpenInNewTab}
                size="lg"
                className="w-full text-lg h-14 gap-3"
              >
                <ExternalLink className="w-5 h-5" />
                Open in New Tab
              </Button>
            </div>
          ) : (
            <Button
              onClick={connectWallet}
              disabled={isConnecting || isEthereumAvailable === null}
              size="lg"
              className="w-full text-lg h-14 gap-3"
            >
              <Wallet className="w-6 h-6" />
              {isConnecting ? 'Connecting...' : 'Connect Wallet'}
            </Button>
          )}

          <div className="text-center text-sm text-muted-foreground space-y-2">
            <p>Supported wallets:</p>
            <p className="font-medium">MetaMask • Any injected wallet</p>
          </div>

          {account && (
            <div className="text-center p-4 rounded-lg bg-muted">
              <p className="text-sm text-muted-foreground mb-1">Connected Address</p>
              <p className="font-mono text-sm font-medium break-all">
                {account}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Connect;
