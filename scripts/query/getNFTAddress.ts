import {NetworkProvider} from "@ton/blueprint";
import {address, Address, beginCell, fromNano, OpenedContract, toNano} from "@ton/core";
import {NftCollection} from "../../wrappers/NFTCollect";
import {TonClient, WalletContractV4} from "@ton/ton";
import {mnemonicToPrivateKey} from "@ton/crypto";
import {nftCollectionContract, rpc} from "../../contest/contractConifg";
import {writeObjectToJson} from "../util/jsonUtil";

interface IWallet{
    mnemonic:string[];
    keyPair:{
        publicKey:string,
        secretKey:string
    },
    address:string
}




export async function run() {

    let obj:{
        [key:number]:string
    } = {}

    const client = new TonClient(rpc.mainnet);
    const nftCollection = client.open(NftCollection.fromAddress(Address.parse(nftCollectionContract.mainnet)));

    for(let i =0;i<2000;i++){
        let suc = false

        while (!suc){
            try {
                const whiteList = await nftCollection.getGetNftAddressByIndex(BigInt(i))
                obj[i] = whiteList!.toString()
                suc=true
                console.log(`${i+1}/2000`)
            }catch (e) {
                suc = false
                console.log("Retry")
            }
        }
    }
    writeObjectToJson("nft-items-address",obj)


    await new Promise(r => setTimeout(r, 20000));

    // ui.clearActionPrompt();
}



run()
