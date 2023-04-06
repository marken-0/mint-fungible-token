// import { Transaction, PublicKey, Connection} from '@solana/web3.js';
// import { TOKEN_PROGRAM_ID, createTransferInstruction } from '@solana/spl-token';
// import {mintKeypair, userWallet} from './mint';
// import { Keypair } from '@solana/web3.js';

// const endpoint = 'https://fittest-frequent-layer.solana-devnet.discover.quiknode.pro/cf422eb10b1b1d15789d990c60b51ecb6d6f8aef/';
// const solanaConnection = new Connection(endpoint);

// // The account that will be sending the tokens
// const senderAddress = new PublicKey(userWallet.publicKey);

// const recipientAddressKeypair = Keypair.generate()
// // The account that will be receiving the tokens
// const recipientAddress = new PublicKey(recipientAddressKeypair.publicKey);

// // The amount of tokens to send
// const amount = 100;

// // The token account that holds the tokens to be transferred
// const tokenAccountAddress = new PublicKey(mintKeypair.publicKey);

// // Create a new transaction object
// const transaction = new Transaction();

// // Add the token transfer instruction to the transaction
// transaction.add(
//     createTransferInstruction(
//         tokenAccountAddress,
//         recipientAddress,
//         senderAddress,
//         amount,
//         [],
//         TOKEN_PROGRAM_ID
//     )
// );

// // transaction.feePayer = senderAddress;
// // transaction.sign(userWallet, mintKeypair);
// // const serializedTransaction = transaction.serialize();


// // Send the transaction
// const main = async() => {
//     const transactionId = await solanaConnection.sendTransaction(transaction, [userWallet, mintKeypair], {skipPreflight: true});
//     console.log(`Transaction ID: ${transactionId}`);
//     console.log(`View Transaction: https://explorer.solana.com/tx/${transactionId}?cluster=devnet`);
// }

// main();