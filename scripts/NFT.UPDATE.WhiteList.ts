import {NetworkProvider} from "@ton/blueprint";
import {address, Address, beginCell, Dictionary, toNano} from "@ton/core";
import {checkInContract, nftCollectionContract, rpc} from "../contest/contractConifg";
import {NftCollection} from "../wrappers/NFTCollect";
import {getSeqNo, waitSeqNoChange} from "./util/getHashBySeqno";
import {awaitConfirmation} from "./CheckIn.SEND.CheckIn";
import {convertMapToWhiteList} from "./util/genWhiteList";
import {Checkin} from "../build/Checkin/tact_Checkin";
import whiteList from "../contest/whiteList.json";
import {TonClient, WalletContractV4} from "@ton/ton";
import {mnemonicToPrivateKey} from "@ton/crypto";
import {deployerWallet} from "../contest/demoWallet";

function getCheckInCell(biz:bigint){
    let body = beginCell().storeUint(0, 32).storeStringTail("Mint").endCell()
    return body
}
export async function run(provider: NetworkProvider, args: string[]) {
    const ui = provider.ui();
    console.log(provider.network())
    const _address = Address.parse(nftCollectionContract[provider.network()]);
    if (!(await provider.isContractDeployed(_address))) {
        ui.write(`Error: Contract at address ${_address} is not deployed!`);
        return;
    }
    const seqno = await getSeqNo(provider, provider.sender().address!);
    const nftCollection = provider.open(NftCollection.fromAddress(_address));
    await nftCollection.send(
        provider.sender(),
        {
            value: toNano('0.1'),
        },
        {
            $$type:"UpdateMintRecord",
            // newList:convertMapToWhiteList(_whiteList)
            newList:Dictionary.empty<bigint, Address>()
        }
    )

    if (await waitSeqNoChange(provider, provider.sender().address!, seqno)) {
        console.log("Msg Sent.")
    }
    ui.clearActionPrompt();
}
