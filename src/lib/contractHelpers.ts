import { Contract, parseUnits, formatUnits } from 'ethers';
import type { JsonRpcSigner, BrowserProvider, JsonRpcApiProvider } from 'ethers';
import { VAULT_CONTRACT_ADDRESS, VAULT_ABI, ERC20_ABI } from '@/contracts/vaultConfig';

type Provider = BrowserProvider | JsonRpcApiProvider;

// Get Vault contract instance
export const getVaultContract = (signerOrProvider: JsonRpcSigner | Provider) => {
  return new Contract(VAULT_CONTRACT_ADDRESS, VAULT_ABI, signerOrProvider);
};

// Get ERC20 token contract instance
export const getTokenContract = (tokenAddress: string, signerOrProvider: JsonRpcSigner | Provider) => {
  return new Contract(tokenAddress, ERC20_ABI, signerOrProvider);
};

// Read token address from vault
export const getTokenAddress = async (provider: Provider): Promise<string> => {
  const vault = getVaultContract(provider);
  return await vault.token();
};

// Read token decimals
export const getTokenDecimals = async (tokenAddress: string, provider: Provider): Promise<number> => {
  const token = getTokenContract(tokenAddress, provider);
  return await token.decimals();
};

// Read user balance from vault
export const getVaultBalance = async (userAddress: string, provider: Provider): Promise<string> => {
  const vault = getVaultContract(provider);
  const balance = await vault.getBalance(userAddress);
  const tokenAddress = await getTokenAddress(provider);
  const decimals = await getTokenDecimals(tokenAddress, provider);
  return formatUnits(balance, decimals);
};

// Read user token balance
export const getTokenBalance = async (tokenAddress: string, userAddress: string, provider: Provider): Promise<string> => {
  const token = getTokenContract(tokenAddress, provider);
  const balance = await token.balanceOf(userAddress);
  const decimals = await getTokenDecimals(tokenAddress, provider);
  return formatUnits(balance, decimals);
};

// Check token allowance
export const getTokenAllowance = async (tokenAddress: string, userAddress: string, provider: Provider): Promise<string> => {
  const token = getTokenContract(tokenAddress, provider);
  const allowance = await token.allowance(userAddress, VAULT_CONTRACT_ADDRESS);
  const decimals = await getTokenDecimals(tokenAddress, provider);
  return formatUnits(allowance, decimals);
};

// Approve token spending
export const approveToken = async (tokenAddress: string, amount: string, signer: JsonRpcSigner) => {
  const token = getTokenContract(tokenAddress, signer);
  const decimals = await getTokenDecimals(tokenAddress, signer.provider!);
  const amountBN = parseUnits(amount, decimals);
  const tx = await token.approve(VAULT_CONTRACT_ADDRESS, amountBN);
  await tx.wait();
  return tx;
};

// Deposit to vault
export const depositToVault = async (amount: string, signer: JsonRpcSigner) => {
  const vault = getVaultContract(signer);
  const tokenAddress = await getTokenAddress(signer.provider!);
  const decimals = await getTokenDecimals(tokenAddress, signer.provider!);
  const amountBN = parseUnits(amount, decimals);
  const tx = await vault.deposit(amountBN);
  await tx.wait();
  return tx;
};

// Withdraw from vault
export const withdrawFromVault = async (amount: string, signer: JsonRpcSigner) => {
  const vault = getVaultContract(signer);
  const tokenAddress = await getTokenAddress(signer.provider!);
  const decimals = await getTokenDecimals(tokenAddress, signer.provider!);
  const amountBN = parseUnits(amount, decimals);
  const tx = await vault.withdraw(amountBN);
  await tx.wait();
  return tx;
};
