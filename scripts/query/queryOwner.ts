
import {address, Address, beginCell, fromNano, OpenedContract, toNano} from "@ton/core";
import {NftCollection} from "../../wrappers/NFTCollect";
import {TonClient} from "@ton/ton";
import {nftCollectionContract, rpc} from "../../contest/contractConifg";
import {writeObjectToJson} from "../util/jsonUtil";
import nftAddress from "../../static/nft-items-address.json";
import {NftItem} from "../../build/XplusAtTonNFT/tact_NftItem";




export async function run() {

    let addressObj:{
        [key:number]:string
    } = nftAddress

    let obj:{
        [key:number]:string
    } = {}
    const client = new TonClient(rpc.mainnet);



    for(const [nftId,nftAddress] of Object.entries(addressObj)){
        let suc = false
        while (!suc){
            try {
                const nftCollection = client.open(NftItem.fromAddress(Address.parse(nftAddress)));
                const data = await nftCollection.getGetNftData()
                obj[+nftId] = data.owner_address.toString()
                suc = true
                console.log(`${nftId}/2000`)
            }catch (e) {
                suc = false
            }
        }
    }
    //
    writeObjectToJson("nft-owner-address",obj)


    await new Promise(r => setTimeout(r, 20000));

    // ui.clearActionPrompt();
}



run()
