# README

## Final Project Overview

This repository contains two key components:

1. **SPL Token Creation and Transfer using Solana Web3.js**
2. **NFT Candy Machine Configuration using Sugar CLI**

These scripts and configurations are part of the Module 3 project for the SOL-PROOF Beginner course on Metacrafters by Akhileshwer Munshi.

---

### 1. SPL Token Creation and Transfer

**File:** `index.js`

This script demonstrates how to create and transfer SPL tokens on the Solana blockchain using the `@solana/web3.js` and `@solana/spl-token` libraries. 

#### Key Steps:
1. **Connect to Solana Devnet:**
   - Establish a connection to the Solana devnet cluster.

2. **Generate Wallets:**
   - Generate or use predefined keypairs for the sender (`fromWallet`) and receiver (`toWallet`).

3. **Airdrop SOL:**
   - Request and confirm an airdrop of SOL to the sender's wallet to cover transaction fees.

4. **Create Token Mint:**
   - Create a new token mint and associated token accounts for the sender.

5. **Mint Tokens:**
   - Mint new tokens to the sender's token account.

6. **Create Receiver's Token Account:**
   - Ensure the receiver has an associated token account for the newly created token.

7. **Transfer Tokens:**
   - Transfer tokens from the sender's token account to the receiver's token account.

8. **Check Balance:**
   - Fetch and display the balance of the sender's wallet in SOL.

### Usage
1. **Install Dependencies:**
   ```bash
   npm install @solana/web3.js @solana/spl-token
   ```

2. **Run the Script:**
   ```bash
   node index.js
   ```

---

### 2. NFT Candy Machine Configuration

**File:** `config.json`

This configuration file sets up an NFT candy machine using the Sugar CLI. It defines parameters such as price, number of NFTs, symbol, seller fee, treasury account, and more.

#### Key Configuration Parameters:
- **price:** The price of each NFT.
- **number:** The total number of NFTs.
- **symbol:** The symbol for the NFT collection.
- **sellerFeeBasisPoints:** The seller fee in basis points (bps).
- **solTreasuryAccount:** The SOL account where proceeds will be deposited.
- **splTokenAccount:** (Optional) The SPL token account.
- **goLiveDate:** The date when the candy machine goes live.
- **retainAuthority:** Whether the authority is retained after minting.
- **isMutable:** Whether the NFTs are mutable after minting.
- **isSequential:** Whether minting is sequential.
- **ruleSet:** Rules applied to the minting process.
- **creators:** An array of creator addresses and their respective shares.

### Usage
1. **Install Sugar CLI:**
   Follow the instructions for installing the Sugar CLI from the [official documentation](https://docs.metaplex.com/candy-machine-v2/installation).

2. **Deploy the Candy Machine:**
   ```bash
   sugar launch
   ```

---

## Author
**Akhileshwer Munshi**  
This project is a part of the SOL-PROOF Beginner course on Metacrafters.
