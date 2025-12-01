import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useWallet } from '@/contexts/WalletContext';
import { Wallet, TrendingUp, PiggyBank, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { getVaultBalance } from '@/lib/contractHelpers';

const Dashboard = () => {
  const { account, provider } = useWallet();
  const [vaultBalance, setVaultBalance] = useState<string>('0.00');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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

    loadBalance();
  }, [account, provider]);

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
