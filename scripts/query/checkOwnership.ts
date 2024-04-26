import nftOwner from '../../static/nft-owner-address.json'
import {writeObjectToJson} from "../util/jsonUtil";

import {Address} from "@ton/core";
interface ILayerWallet {
    masterWallet:IWallet
    branchWallet:IWallet[]
}
interface IWallet{
    mnemonic:string[];
    keyPair:{
        publicKey:string,
        secretKey:string
    },
    address:string
}

const targetNft = "1979\n" +
    "1898\n" +
    "1821\n" +
    "1773\n" +
    "1772\n" +
    "1760\n" +
    "1743\n" +
    "1721\n" +
    "1711\n" +
    "1699\n" +
    "1661\n" +
    "1647\n" +
    "1595\n" +
    "1583\n" +
    "1553\n" +
    "1540\n" +
    "1487\n" +
    "1466\n" +
    "1456\n" +
    "1424\n" +
    "1382\n" +
    "1371\n" +
    "1318\n" +
    "1311\n" +
    "1301\n" +
    "1267\n" +
    "1266\n" +
    "1211\n" +
    "1207\n" +
    "1176\n" +
    "1159\n" +
    "1104\n" +
    "1062\n" +
    "1048\n" +
    "1005\n" +
    "1004\n" +
    "933\n" +
    "922\n" +
    "898\n" +
    "872\n" +
    "854\n" +
    "841\n" +
    "824\n" +
    "816\n" +
    "794\n" +
    "792\n" +
    "757\n" +
    "720\n" +
    "710\n" +
    "702\n" +
    "657\n" +
    "635\n" +
    "631\n" +
    "552\n" +
    "539\n" +
    "506\n" +
    "505\n" +
    "437\n" +
    "389\n" +
    "344\n" +
    "343\n" +
    "315\n" +
    "273\n" +
    "253\n" +
    "252\n" +
    "249\n" +
    "242\n" +
    "210\n" +
    "205\n" +
    "139\n" +
    "81\n" +
    "67\n" +
    "40\n" +
    "35\n" +
    "24"

const main = ()=>{
    const nftIdList : string[] = targetNft.split(`\n`)
    const _ownerObj:{
        [key:number]:string
    } = nftOwner



    const obj:{
        [key:number]:string
    } = {}
    nftIdList.map((targetId:string)=>{
        const owner = _ownerObj[+targetId]
        obj[+targetId] = owner
    })



    writeObjectToJson("target-nft-owner",obj)
}

main()


