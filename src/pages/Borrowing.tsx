import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useWallet } from '@/contexts/WalletContext';
import { CreditCard, AlertCircle, ArrowDownToLine, ArrowUpFromLine } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';

const Borrowing = () => {
  const { account } = useWallet();
  const [borrowAmount, setBorrowAmount] = useState('');
  const [repayAmount, setRepayAmount] = useState('');

  const handleBorrow = async () => {
    if (!account) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet first",
        variant: "destructive",
      });
      return;
    }

    if (!borrowAmount || parseFloat(borrowAmount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid borrow amount",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Borrow request initiated",
      description: `Borrowing ${borrowAmount} ETH...`,
    });
    
    // Smart contract integration would go here
    setBorrowAmount('');
  };

  const handleRepay = async () => {
    if (!account) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet first",
        variant: "destructive",
      });
      return;
    }

    if (!repayAmount || parseFloat(repayAmount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid repayment amount",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Repayment initiated",
      description: `Repaying ${repayAmount} ETH...`,
    });
    
    // Smart contract integration would go here
    setRepayAmount('');
  };

  if (!account) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-12rem)]">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="text-center">
            <div className="mx-auto h-16 w-16 rounded-full bg-gradient-to-br from-primary to-destructive flex items-center justify-center mb-4">
              <CreditCard className="h-8 w-8 text-primary-foreground" />
            </div>
            <CardTitle className="text-2xl">Connect Your Wallet</CardTitle>
            <CardDescription>
              Connect your wallet to access borrowing features
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Borrowing</h1>
        <p className="text-muted-foreground">Borrow against your crypto collateral</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="shadow-[var(--shadow-card)]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Borrowed
            </CardTitle>
            <CreditCard className="h-5 w-5 text-destructive" />
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
              Available Credit
            </CardTitle>
            <CreditCard className="h-5 w-5 text-success" />
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
              Interest Rate
            </CardTitle>
            <AlertCircle className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">6.75%</div>
          </CardContent>
        </Card>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Borrowing requires collateral. Make sure you understand the risks before proceeding.
        </AlertDescription>
      </Alert>

      <Card className="shadow-[var(--shadow-card)]">
        <CardHeader>
          <CardTitle>Manage Your Loans</CardTitle>
          <CardDescription>Borrow funds or repay existing loans</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="borrow" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="borrow" className="gap-2">
                <ArrowDownToLine className="h-4 w-4" />
                Borrow
              </TabsTrigger>
              <TabsTrigger value="repay" className="gap-2">
                <ArrowUpFromLine className="h-4 w-4" />
                Repay
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="borrow" className="space-y-4 mt-6">
              <div className="space-y-2">
                <Label htmlFor="borrow-amount">Amount (ETH)</Label>
                <Input
                  id="borrow-amount"
                  type="number"
                  placeholder="0.0"
                  value={borrowAmount}
                  onChange={(e) => setBorrowAmount(e.target.value)}
                  step="0.01"
                  min="0"
                />
              </div>
              <Button onClick={handleBorrow} className="w-full gap-2">
                <ArrowDownToLine className="h-4 w-4" />
                Borrow
              </Button>
            </TabsContent>
            
            <TabsContent value="repay" className="space-y-4 mt-6">
              <div className="space-y-2">
                <Label htmlFor="repay-amount">Amount (ETH)</Label>
                <Input
                  id="repay-amount"
                  type="number"
                  placeholder="0.0"
                  value={repayAmount}
                  onChange={(e) => setRepayAmount(e.target.value)}
                  step="0.01"
                  min="0"
                />
              </div>
              <Button onClick={handleRepay} variant="outline" className="w-full gap-2">
                <ArrowUpFromLine className="h-4 w-4" />
                Repay
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Borrowing;
