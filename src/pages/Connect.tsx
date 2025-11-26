import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '@/contexts/WalletContext';
import { useWeb3Modal } from '@web3modal/ethers/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Wallet } from 'lucide-react';

const Connect = () => {
  const { account } = useWallet();
  const { open } = useWeb3Modal();
  const navigate = useNavigate();

  useEffect(() => {
    if (account) {
      navigate('/dashboard');
    }
  }, [account, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl font-bold">Connect Your Wallet</CardTitle>
          <CardDescription className="text-base">
            Connect your wallet to access the Herckerton Community Finance Hub.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Button
            onClick={() => open()}
            size="lg"
            className="w-full text-lg h-14 gap-3"
          >
            <Wallet className="w-6 h-6" />
            Connect Wallet
          </Button>

          <div className="text-center text-sm text-muted-foreground space-y-2">
            <p>Supported wallets:</p>
            <p className="font-medium">MetaMask • WalletConnect • Coinbase Wallet • and more</p>
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
