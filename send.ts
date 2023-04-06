import { Connection, Keypair, PublicKey, sendAndConfirmTransaction, SystemProgram, Transaction, TransactionInstruction } from "@solana/web3.js";
import { Drop, dropList } from "./drop";
import secret from './guideSecret.json';

const endpoint = 'https://fittest-frequent-layer.solana-devnet.discover.quiknode.pro/cf422eb10b1b1d15789d990c60b51ecb6d6f8aef/';
const solanaConnection = new Connection(endpoint);

const fromKeypair = Keypair.fromSecretKey(new Uint8Array(secret));
const dropsPerTxn = 10;
const txnInterval = 1000;

function generateTransactions(batchSize:number, dropList: Drop[], fromWallet: PublicKey):Transaction[] {
    let result: Transaction[] = [];
    let txInstructions: TransactionInstruction[] = dropList.map(drop => {return SystemProgram.transfer({
        fromPubkey: fromWallet,
        toPubkey: new PublicKey(drop.walletAddress),
        lamports: drop.numLamports
        })})
    
    const numTransactions = Math.ceil(txInstructions.length / batchSize);
    for (let i = 0; i < numTransactions; i++){
        let bulkTransaction = new Transaction();
        let lowerIndex = i * batchSize;
        let upperIndex = (i+1) * batchSize;
        for (let j = lowerIndex; j < upperIndex; j++){
            if (txInstructions[j]) {bulkTransaction.add(txInstructions[j]);}
        }
        result.push(bulkTransaction);
    }

    return result;
}

async function executeTransactions(solanaConnection: Connection, transactionList: Transaction[], payer: Keypair):Promise<PromiseSettledResult<string>[]> {
    let result:PromiseSettledResult<string>[] = [];
    let staggeredTransactions:Promise<string>[] = transactionList.map((transaction, i, allTx) => {
        return (new Promise((resolve) => {
            setTimeout(() => {
                console.log(`Requesting Transaction ${i+1}/${allTx.length}`);                
                solanaConnection.getLatestBlockhash()
                    .then(recentHash=>transaction.recentBlockhash = recentHash.blockhash)
                    .then(()=>sendAndConfirmTransaction(solanaConnection,transaction,[payer])).then(resolve);
            }, i * txnInterval);
         })
    )})
    result = await Promise.allSettled(staggeredTransactions);
    return result;
}

(async () => {
    console.log(`Initiating SOL drop from ${fromKeypair.publicKey.toString()}`);
    const transactionList = generateTransactions(dropsPerTxn,dropList,fromKeypair.publicKey);
    const txResults = await executeTransactions(solanaConnection,transactionList,fromKeypair);
    console.log(await txResults);
})()




