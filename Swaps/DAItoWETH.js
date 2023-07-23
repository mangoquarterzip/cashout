// Update the WETH contract address and ABI with the correct values
// this is goerli
const daiToWethContractAddress = '0xE349e66fF07179113d59fe79b075271895D70aaD';
const daiToWethabi = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amountIn",
				"type": "uint256"
			}
		],
		"name": "swapExactInputSingle",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "amountOut",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "contract ISwapRouter",
				"name": "_swapRouter",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "DAI",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "poolFee",
		"outputs": [
			{
				"internalType": "uint24",
				"name": "",
				"type": "uint24"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "swapRouter",
		"outputs": [
			{
				"internalType": "contract ISwapRouter",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "USDC",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "WETH9",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
 // Replace with the WETH contract ABI

async function daiToWeth() {
  try {
    // Check if MetaMask is available
    if (typeof window.ethereum === 'undefined') {
      console.error('MetaMask not installed.');
      return;
    }

    // Request account access if not connected
    await window.ethereum.request({ method: 'eth_requestAccounts' });

    // Set up the ethers provider and signer using MetaMask's provider
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    // Create the contract instance using the WETH contract address and ABI
    const Contract = new ethers.Contract(daiToWethContractAddress, daiToWethabi, signer);

    // Convert 0.01 WETH to its base unit (Wei)
    const amountIn = ethers.utils.parseUnits('0.01', 18); // need to make this dynamic

    // Call the withdraw function on the WETH contract
    const tx = await Contract.swapExactInputSingle(amountIn);

    console.log('Withdraw transaction hash:', tx.hash);

    // Wait for the transaction to be mined
    await tx.wait();

    console.log('Withdrawal successful!');
  } catch (error) {
    console.error('Error while withdrawing WETH:', error);
  }
}

// Call the withdrawWETH function when you want to execute the withdrawal
const daiToWethButton = document.getElementById('daiToWeth');
daiToWethButton.addEventListener('click', () => {
    console.log('clicked');
  daiToWeth();
});