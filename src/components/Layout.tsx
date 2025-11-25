import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Wallet, LayoutDashboard, PiggyBank, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWallet } from '@/contexts/WalletContext';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { account, connectWallet, disconnectWallet, isConnecting } = useWallet();
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/savings', label: 'Savings', icon: PiggyBank },
    { path: '/borrowing', label: 'Borrowing', icon: CreditCard },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent"></div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                HCFH
              </span>
            </Link>
            
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link key={item.path} to={item.path}>
                    <Button
                      variant="ghost"
                      className={cn(
                        "gap-2 transition-all",
                        isActive && "bg-primary/10 text-primary hover:bg-primary/20"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </Button>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {account ? (
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 border border-primary/20">
                  <div className="h-2 w-2 rounded-full bg-success animate-pulse"></div>
                  <span className="text-sm font-medium">
                    {account.slice(0, 6)}...{account.slice(-4)}
                  </span>
                </div>
                <Button variant="outline" onClick={disconnectWallet}>
                  Disconnect
                </Button>
              </div>
            ) : (
              <Button onClick={connectWallet} disabled={isConnecting} className="gap-2">
                <Wallet className="h-4 w-4" />
                {isConnecting ? 'Connecting...' : 'Connect Wallet'}
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="container py-8">
        {children}
      </main>
    </div>
  );
};
