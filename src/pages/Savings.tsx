import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useWallet } from '@/contexts/WalletContext';
import { PiggyBank, TrendingUp, ArrowDownToLine, ArrowUpFromLine } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Savings = () => {
  const { account } = useWallet();
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');

  const handleDeposit = async () => {
    if (!account) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet first",
        variant: "destructive",
      });
      return;
    }

    if (!depositAmount || parseFloat(depositAmount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid deposit amount",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Deposit initiated",
      description: `Depositing ${depositAmount} ETH...`,
    });
    
    // Smart contract integration would go here
    setDepositAmount('');
  };

  const handleWithdraw = async () => {
    if (!account) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet first",
        variant: "destructive",
      });
      return;
    }

    if (!withdrawAmount || parseFloat(withdrawAmount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid withdrawal amount",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Withdrawal initiated",
      description: `Withdrawing ${withdrawAmount} ETH...`,
    });
    
    // Smart contract integration would go here
    setWithdrawAmount('');
  };

  if (!account) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-12rem)]">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="text-center">
            <div className="mx-auto h-16 w-16 rounded-full bg-gradient-to-br from-accent to-success flex items-center justify-center mb-4">
              <PiggyBank className="h-8 w-8 text-accent-foreground" />
            </div>
            <CardTitle className="text-2xl">Connect Your Wallet</CardTitle>
            <CardDescription>
              Connect your wallet to start saving and earning interest
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Savings</h1>
        <p className="text-muted-foreground">Deposit and earn interest on your crypto assets</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="shadow-[var(--shadow-card)]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Deposited
            </CardTitle>
            <PiggyBank className="h-5 w-5 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              0.00
              <span className="text-lg text-muted-foreground ml-2">ETH</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-[var(--shadow-card)]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Interest Earned
            </CardTitle>
            <TrendingUp className="h-5 w-5 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              0.00
              <span className="text-lg text-muted-foreground ml-2">ETH</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-[var(--shadow-card)]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Current APY
            </CardTitle>
            <TrendingUp className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">5.25%</div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-[var(--shadow-card)]">
        <CardHeader>
          <CardTitle>Manage Your Savings</CardTitle>
          <CardDescription>Deposit or withdraw your funds</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="deposit" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="deposit" className="gap-2">
                <ArrowDownToLine className="h-4 w-4" />
                Deposit
              </TabsTrigger>
              <TabsTrigger value="withdraw" className="gap-2">
                <ArrowUpFromLine className="h-4 w-4" />
                Withdraw
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="deposit" className="space-y-4 mt-6">
              <div className="space-y-2">
                <Label htmlFor="deposit-amount">Amount (ETH)</Label>
                <Input
                  id="deposit-amount"
                  type="number"
                  placeholder="0.0"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  step="0.01"
                  min="0"
                />
              </div>
              <Button onClick={handleDeposit} className="w-full gap-2">
                <ArrowDownToLine className="h-4 w-4" />
                Deposit
              </Button>
            </TabsContent>
            
            <TabsContent value="withdraw" className="space-y-4 mt-6">
              <div className="space-y-2">
                <Label htmlFor="withdraw-amount">Amount (ETH)</Label>
                <Input
                  id="withdraw-amount"
                  type="number"
                  placeholder="0.0"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  step="0.01"
                  min="0"
                />
              </div>
              <Button onClick={handleWithdraw} variant="outline" className="w-full gap-2">
                <ArrowUpFromLine className="h-4 w-4" />
                Withdraw
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Savings;
