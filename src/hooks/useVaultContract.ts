import { useState, useEffect, useCallback } from 'react';
import { Contract, parseUnits, formatUnits } from 'ethers';
import { useWallet } from '@/contexts/WalletContext';
import { VAULT_CONTRACT_ADDRESS, VAULT_ABI, ERC20_ABI } from '@/contracts/vaultConfig';
import { toast } from '@/hooks/use-toast';

export const useVaultContract = () => {
  const { signer, provider, account } = useWallet();
  const [vaultBalance, setVaultBalance] = useState<string>('0');
  const [tokenBalance, setTokenBalance] = useState<string>('0');
  const [tokenAddress, setTokenAddress] = useState<string | null>(null);
  const [decimals, setDecimals] = useState<number>(18);
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Get vault contract instance (read-only or with signer)
  const getVaultContract = useCallback(() => {
    if (!provider && !signer) return null;
    return new Contract(VAULT_CONTRACT_ADDRESS, VAULT_ABI, signer || provider);
  }, [signer, provider]);

  // Get token contract instance
  const getTokenContract = useCallback((address: string) => {
    if (!provider && !signer) return null;
    return new Contract(address, ERC20_ABI, signer || provider);
  }, [signer, provider]);

  // Load token address and decimals
  const loadTokenInfo = useCallback(async () => {
    const vault = getVaultContract();
    if (!vault) return;

    try {
      const address = await vault.token();
      setTokenAddress(address);
      
      const token = getTokenContract(address);
      if (token) {
        const dec = await token.decimals();
        setDecimals(Number(dec));
      }
    } catch (error) {
      console.error('Failed to load token info:', error);
    }
  }, [getVaultContract, getTokenContract]);

  // Load balances
  const loadBalances = useCallback(async () => {
    if (!account || !provider) return;
    
    const vault = getVaultContract();
    if (!vault) return;

    setIsLoading(true);
    try {
      // Load vault balance
      const vBal = await vault.getBalance(account);
      setVaultBalance(formatUnits(vBal, decimals));

      // Load token balance if we have token address
      if (tokenAddress) {
        const token = getTokenContract(tokenAddress);
        if (token) {
          const tBal = await token.balanceOf(account);
          setTokenBalance(formatUnits(tBal, decimals));
        }
      }
    } catch (error) {
      console.error('Failed to load balances:', error);
    } finally {
      setIsLoading(false);
    }
  }, [account, provider, tokenAddress, decimals, getVaultContract, getTokenContract]);

  // Deposit to vault
  const deposit = useCallback(async (amount: string) => {
    if (!signer || !account || !tokenAddress) {
      toast({ title: 'Error', description: 'Wallet not connected', variant: 'destructive' });
      return false;
    }

    setIsProcessing(true);
    try {
      const amountBN = parseUnits(amount, decimals);
      
      // First approve
      const token = new Contract(tokenAddress, ERC20_ABI, signer);
      toast({ title: 'Approving...', description: 'Please confirm the approval transaction' });
      const approveTx = await token.approve(VAULT_CONTRACT_ADDRESS, amountBN);
      await approveTx.wait();

      // Then deposit
      const vault = new Contract(VAULT_CONTRACT_ADDRESS, VAULT_ABI, signer);
      toast({ title: 'Depositing...', description: 'Please confirm the deposit transaction' });
      const depositTx = await vault.deposit(amountBN);
      await depositTx.wait();

      toast({ title: 'Success', description: `Deposited ${amount} tokens` });
      await loadBalances();
      return true;
    } catch (error: any) {
      const message = error?.reason || error?.message || 'Transaction failed';
      toast({ title: 'Deposit Failed', description: message, variant: 'destructive' });
      return false;
    } finally {
      setIsProcessing(false);
    }
  }, [signer, account, tokenAddress, decimals, loadBalances]);

  // Withdraw from vault
  const withdraw = useCallback(async (amount: string) => {
    if (!signer || !account) {
      toast({ title: 'Error', description: 'Wallet not connected', variant: 'destructive' });
      return false;
    }

    setIsProcessing(true);
    try {
      const amountBN = parseUnits(amount, decimals);
      const vault = new Contract(VAULT_CONTRACT_ADDRESS, VAULT_ABI, signer);
      
      toast({ title: 'Withdrawing...', description: 'Please confirm the transaction' });
      const tx = await vault.withdraw(amountBN);
      await tx.wait();

      toast({ title: 'Success', description: `Withdrew ${amount} tokens` });
      await loadBalances();
      return true;
    } catch (error: any) {
      const message = error?.reason || error?.message || 'Transaction failed';
      toast({ title: 'Withdraw Failed', description: message, variant: 'destructive' });
      return false;
    } finally {
      setIsProcessing(false);
    }
  }, [signer, account, decimals, loadBalances]);

  // Initialize on mount and when dependencies change
  useEffect(() => {
    if (provider) {
      loadTokenInfo();
    }
  }, [provider, loadTokenInfo]);

  useEffect(() => {
    if (account && tokenAddress) {
      loadBalances();
    }
  }, [account, tokenAddress, loadBalances]);

  return {
    vaultBalance,
    tokenBalance,
    tokenAddress,
    isLoading,
    isProcessing,
    deposit,
    withdraw,
    refreshBalances: loadBalances,
  };
};
