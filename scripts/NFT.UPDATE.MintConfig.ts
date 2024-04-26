import {NetworkProvider} from "@ton/blueprint";
import {address, Address, beginCell, toNano} from "@ton/core";
import {nftCollectionContract, rpc} from "../contest/contractConifg";
import {NftCollection} from "../wrappers/NFTCollect";
import {getSeqNo, waitSeqNoChange} from "./util/getHashBySeqno";
import {awaitConfirmation} from "./CheckIn.SEND.CheckIn";
import {convertMapToWhiteList} from "./util/genWhiteList";
import {convertDateFromTs} from "./util/dateTimeTools";
import {TonClient, WalletContractV4} from "@ton/ton";
import {mnemonicToPrivateKey} from "@ton/crypto";
import {deployerWallet} from "../contest/demoWallet";

function getCheckInCell(biz:bigint){
    let body = beginCell().storeUint(0, 32).storeStringTail("Mint").endCell()
    return body
}

export async function run(provider: NetworkProvider, args: string[]) {
    const ui = provider.ui();
    const _address = Address.parse(nftCollectionContract[provider.network()]);
    if (!(await provider.isContractDeployed(_address))) {
        ui.write(`Error: Contract at address ${_address} is not deployed!`);
        return;
    }
    const seqno = await getSeqNo(provider, provider.sender().address!);
    const nftCollection = provider.open(NftCollection.fromAddress(_address));
    const phase1Start = new Date("2024-04-22T12:00:00Z")
    const phase1End = new Date("2024-04-22T15:00:00Z")
    const phase2Start = new Date("2024-04-22T15:00:00Z")
    const phase2End = new Date("2024-04-22T20:00:00Z")
    // {
    //     $$type:"UpdatePhaseConfigParams",
    //         targetPhase:BigInt(1),
    //     newConfig:{
    //     $$type:"NftPhaseConfig",
    //         startDate:convertDateFromTs(phase1Start),
    //         endDate:convertDateFromTs(phase1End),
    //         price:toNano(4.5),
    // }
    // }

    // {
    //     $$type:"UpdatePhaseConfigParams",
    //         targetPhase:BigInt(2),
    //     newConfig: {
    //     $$type:"NftPhaseConfig",
    //         startDate:convertDateFromTs(phase2Start),
    //         endDate:convertDateFromTs(phase2End),
    //         price:toNano(6),
    // }
    // }
    const client = new TonClient(rpc[provider.network() as 'testnet'|'mainnet']);
    let keyPair = await mnemonicToPrivateKey(deployerWallet.split(' '));
    const { publicKey,secretKey } = keyPair
    let workchain = 0; // Usually you need a workchain 0
    let wallet = WalletContractV4.create({ workchain, publicKey: publicKey });
    const walletContract = client.open(wallet);
    const sender = walletContract.sender(secretKey);

    await nftCollection.send(
        sender,
        {
            value: toNano('0.1'),
        },
        {
            $$type:"UpdatePhaseConfigParams",
            targetPhase:BigInt(2),
            newConfig: {
                $$type:"NftPhaseConfig",
                startDate:convertDateFromTs(phase2Start),
                endDate:convertDateFromTs(phase2End),
                price:toNano(6),
            }
        }
    )

    if (await waitSeqNoChange(provider, provider.sender().address!, seqno)) {
        console.log("Msg Sent.")
    }
    ui.clearActionPrompt();
}
