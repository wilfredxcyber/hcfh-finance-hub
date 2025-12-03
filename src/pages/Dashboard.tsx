import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useWallet } from '@/contexts/WalletContext';
import { useVaultContract } from '@/hooks/useVaultContract';
import { Wallet, TrendingUp, PiggyBank, CreditCard, ArrowDownToLine, ArrowUpFromLine } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { account } = useWallet();
  const { vaultBalance, isLoading, isProcessing, deposit, withdraw } = useVaultContract();
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');

  const handleDeposit = async () => {
    if (!depositAmount) return;
    const success = await deposit(depositAmount);
    if (success) setDepositAmount('');
  };

  const handleWithdraw = async () => {
    if (!withdrawAmount) return;
    const success = await withdraw(withdrawAmount);
    if (success) setWithdrawAmount('');
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
              Connect your wallet to access Fortress X
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
              disabled={!depositAmount || isProcessing}
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
              disabled={!withdrawAmount || isProcessing}
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
