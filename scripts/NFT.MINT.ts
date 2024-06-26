import {NetworkProvider} from "@ton/blueprint";
import {address, Address, beginCell, toNano} from "@ton/core";
import {nftCollectionContract} from "../contest/contractConifg";
import {NftCollection} from "../wrappers/NFTCollect";
import {getSeqNo, waitSeqNoChange} from "./util/getHashBySeqno";
import {awaitConfirmation} from "./CheckIn.SEND.CheckIn";

function getCheckInCell(biz: bigint) {
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
    console.log({seqno})
    const nftCollection = provider.open(NftCollection.fromAddress(_address));
    await nftCollection.send(
        provider.sender(),
        {
            value: toNano('4.52'),
        },
        "withdraw safe"
    )

    if (await waitSeqNoChange(provider, provider.sender().address!, seqno)) {
        console.log("Msg Sent.")
    }
    ui.clearActionPrompt();
}
