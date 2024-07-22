import { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { createMint, getOrCreateAssociatedTokenAccount, mintTo, transfer } from '@solana/spl-token';

(async () => {
    // Step 1: Connect to cluster and generate a new Keypair
    // Step 1: Connect to cluster and generate two new Keypairs
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

    // const fromWallet = Keypair.generate();
    // const toWallet = Keypair.generate();
    // console.log('fromWallet: ', fromWallet.publicKey);
    // console.log(fromWallet.secretKey);
    // console.log('toWallet: ', toWallet.publicKey);
    // console.log(toWallet.secretKey);

    const FROM_SECRET_KEY = new Uint8Array(
        [
            172, 212,  78,  46, 219, 245,  23, 161,  27,   7,
            176, 152, 210, 225, 165,  71, 137, 234, 181, 234,
            241, 224, 248, 180,  74, 255,  52, 195, 157,  36,
            181,  41, 251, 129, 119,  47, 176, 146,  20, 116,
            206, 187, 104, 128,  58, 147,  32,  31, 227, 212,
            220, 213, 144, 141, 249, 207, 130, 118, 104, 193,
            196, 161, 244, 212
        ]            
    );
    const TO_SECRET_KEY = new Uint8Array(
        [
            253, 146, 136, 217, 105, 178,  45,  87, 157, 200, 181,
            170, 171, 194, 169, 248, 222, 242, 215,   4, 242, 225,
            156, 177, 165, 193,  92, 160,  18,  27, 184, 219,  72,
            250, 146, 218, 231, 224,  21, 197, 223,  71,  55, 127,
            33, 152, 146,  49, 214, 174, 131, 122, 251,  97, 172,
            82,  71, 105, 185,   9,   4,  80,  47, 172
        ]            
    );

    const fromWallet = Keypair.fromSecretKey(FROM_SECRET_KEY);
    const toWallet = Keypair.fromSecretKey(TO_SECRET_KEY);

    // // Step 2: Airdrop SOL into your from wallet
    // // Step 2: Airdrop SOL into your from wallet
    const fromAirdropSignature = await connection.requestAirdrop(fromWallet.publicKey, 2*LAMPORTS_PER_SOL);
    // Wait for airdrop confirmation
    await connection.confirmTransaction(fromAirdropSignature, { commitment: "confirmed" });

    // Step 3: Create new token mint and get the token account of the fromWallet address
    //If the token account does not exist, create it
    // Step 3: Create new token mint and get the token account of the fromWallet address
    //If the token account does not exist, create it
    const mint = await createMint(connection, fromWallet, fromWallet.publicKey, null, 9);
    const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            fromWallet,
            mint,
            fromWallet.publicKey
    )

    
    //Step 4: Mint a new token to the from account
    //Step 4: Mint a new token to the from account
    let signature = await mintTo(
        connection,
        fromWallet,
        mint,
        fromTokenAccount.address,
        fromWallet.publicKey,
        1000000000,
        []
    );
    console.log('mint tx:', signature);


    //Step 5: Get the token account of the to-wallet address and if it does not exist, create it
    //Step 5: Get the token account of the to-wallet address and if it does not exist, create it
    const toTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        fromWallet,
        mint,
        // toWallet.publicKey
        new PublicKey("69n9Jm8pPSQYULvxJPi7tpqPNWG2Gf2UCNoVCXMEyQx")
    );


    //Step 6: Transfer the new token to the to-wallet's token account that was just created
    // Transfer the new token to the "toTokenAccount" we just created
    //Step 6: Transfer the new token to the to-wallet's token account that was just created
    // Transfer the new token to the "toTokenAccount" we just created
    signature = await transfer(
        connection,
        fromWallet,
        fromTokenAccount.address,
        toTokenAccount.address,
        fromWallet.publicKey,
        1000,
        []
    );
    console.log('transfer tx:', signature);

    try {
        // console.log("Connection object is:", connection);

        // Make a wallet (keypair) from privateKey and get its balance
        // const myWallet = await Keypair.fromSecretKey(privateKey);
        const walletBalance = await connection.getBalance(
            fromWallet.publicKey
        );
        console.log(`Wallet balance: ${parseInt(walletBalance) / LAMPORTS_PER_SOL} SOL`);
    } catch (err) {
        console.log(err);
    }

})();