import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useWallet } from '@/contexts/WalletContext';
import { Wallet, TrendingUp, PiggyBank, CreditCard, ArrowDownToLine, ArrowUpFromLine } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';
import { getVaultBalance, getTokenAddress, getTokenDecimals, approveToken, depositToVault, withdrawFromVault } from '@/lib/contractHelpers';
import { parseUnits } from 'ethers';
import { useToast } from '@/hooks/use-toast';

const Dashboard = () => {
  const { account, provider, signer } = useWallet();
  const { toast } = useToast();
  const [vaultBalance, setVaultBalance] = useState<string>('0.00');
  const [isLoading, setIsLoading] = useState(true);
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const loadBalance = async () => {
    if (!account || !provider) return;
    
    try {
      setIsLoading(true);
      const balance = await getVaultBalance(account, provider);
      setVaultBalance(balance);
    } catch (error) {
      console.error('Error loading vault balance:', error);
      setVaultBalance('0.00');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadBalance();
  }, [account, provider]);

  const handleDeposit = async () => {
    if (!signer || !provider || !depositAmount) return;

    try {
      setIsProcessing(true);
      
      const tokenAddress = await getTokenAddress(provider);
      const decimals = await getTokenDecimals(tokenAddress, provider);
      const amount = parseUnits(depositAmount, decimals);

      // Step 1: Approve token
      toast({
        title: "Approving tokens...",
        description: "Please confirm the approval transaction",
      });
      
      await approveToken(tokenAddress, amount.toString(), signer);
      
      // Step 2: Deposit
      toast({
        title: "Depositing...",
        description: "Please confirm the deposit transaction",
      });
      
      await depositToVault(amount.toString(), signer);
      
      toast({
        title: "Success!",
        description: `Deposited ${depositAmount} HCT to vault`,
      });
      
      setDepositAmount('');
      await loadBalance();
    } catch (error: any) {
      toast({
        title: "Deposit Failed",
        description: error?.message || "Failed to deposit tokens",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleWithdraw = async () => {
    if (!signer || !provider || !withdrawAmount) return;

    try {
      setIsProcessing(true);
      
      const tokenAddress = await getTokenAddress(provider);
      const decimals = await getTokenDecimals(tokenAddress, provider);
      const amount = parseUnits(withdrawAmount, decimals);

      toast({
        title: "Withdrawing...",
        description: "Please confirm the withdrawal transaction",
      });
      
      await withdrawFromVault(amount.toString(), signer);
      
      toast({
        title: "Success!",
        description: `Withdrawn ${withdrawAmount} HCT from vault`,
      });
      
      setWithdrawAmount('');
      await loadBalance();
    } catch (error: any) {
      toast({
        title: "Withdrawal Failed",
        description: error?.message || "Failed to withdraw tokens",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const stats = [
    { label: 'Vault Balance', value: isLoading ? '...' : vaultBalance, unit: 'HCT', icon: Wallet, color: 'text-primary' },
    { label: 'Total Savings', value: isLoading ? '...' : vaultBalance, unit: 'HCT', icon: PiggyBank, color: 'text-accent' },
    { label: 'Active Loans', value: '0.00', unit: 'HCT', icon: CreditCard, color: 'text-destructive' },
    { label: 'Interest Earned', value: '0.00', unit: 'HCT', icon: TrendingUp, color: 'text-success' },
  ];

  if (!account) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-12rem)]">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="text-center">
            <div className="mx-auto h-16 w-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4">
              <Wallet className="h-8 w-8 text-primary-foreground" />
            </div>
            <CardTitle className="text-2xl">Connect Your Wallet</CardTitle>
            <CardDescription>
              Connect your wallet to access the Herckerton Community Finance Hub
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your finance hub overview</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="shadow-[var(--shadow-card)] transition-all hover:shadow-[var(--shadow-glow)]">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {stat.value}
                  <span className="text-lg text-muted-foreground ml-2">{stat.unit}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-[var(--shadow-card)] transition-all">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowDownToLine className="h-5 w-5 text-success" />
              Deposit to Vault
            </CardTitle>
            <CardDescription>Add tokens to your vault balance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="deposit-amount">Amount (HCT)</Label>
              <Input
                id="deposit-amount"
                type="number"
                placeholder="0.00"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                disabled={isProcessing}
                min="0"
                step="0.01"
              />
            </div>
            <Button 
              className="w-full" 
              onClick={handleDeposit}
              disabled={!depositAmount || isProcessing || !signer}
            >
              {isProcessing ? 'Processing...' : 'Deposit'}
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-[var(--shadow-card)] transition-all">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowUpFromLine className="h-5 w-5 text-primary" />
              Withdraw from Vault
            </CardTitle>
            <CardDescription>Withdraw tokens from your balance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="withdraw-amount">Amount (HCT)</Label>
              <Input
                id="withdraw-amount"
                type="number"
                placeholder="0.00"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                disabled={isProcessing}
                min="0"
                step="0.01"
              />
            </div>
            <Button 
              variant="outline"
              className="w-full" 
              onClick={handleWithdraw}
              disabled={!withdrawAmount || isProcessing || !signer}
            >
              {isProcessing ? 'Processing...' : 'Withdraw'}
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-glow)] transition-all">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PiggyBank className="h-5 w-5 text-accent" />
              Savings
            </CardTitle>
            <CardDescription>Earn interest on your deposits</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Start saving today and earn competitive interest rates on your cryptocurrency deposits.
            </p>
            <Link to="/savings">
              <Button className="w-full">Go to Savings</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-glow)] transition-all">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-destructive" />
              Borrowing
            </CardTitle>
            <CardDescription>Access liquidity when you need it</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Borrow against your crypto holdings with competitive rates and flexible terms.
            </p>
            <Link to="/borrowing">
              <Button variant="outline" className="w-full">Go to Borrowing</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
