import {NetworkProvider} from "@ton/blueprint";
import {address, Address, beginCell, toNano} from "@ton/core";
import {checkInContract, nftCollectionContract, rpc} from "../contest/contractConifg";
import {NftCollection} from "../wrappers/NFTCollect";
import {getSeqNo, waitSeqNoChange} from "./util/getHashBySeqno";
import {awaitConfirmation} from "./CheckIn.SEND.CheckIn";
import {convertMapToInsertWhiteList, convertMapToWhiteList} from "./util/genWhiteList";
import {Checkin} from "../build/Checkin/tact_Checkin";
import whiteList from "../contest/whiteList.json";
import {TonClient, WalletContractV4} from "@ton/ton";
import {mnemonicToPrivateKey} from "@ton/crypto";
import {deployerWallet} from "../contest/demoWallet";

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
    const _whiteList = whiteList.whiteList
    const nftCollection = provider.open(NftCollection.fromAddress(_address));
    const client = new TonClient(rpc[provider.network() as 'testnet' | 'mainnet']);
    let keyPair = await mnemonicToPrivateKey(deployerWallet.split(' '));
    const {publicKey, secretKey} = keyPair
    let workchain = 0; // Usually you need a workchain 0
    let wallet = WalletContractV4.create({workchain, publicKey: publicKey});
    const walletContract = client.open(wallet);
    const sender = walletContract.sender(secretKey);
    const insertList = convertMapToInsertWhiteList(_whiteList)
    for (let i = 0; i < insertList.length; i++) {
        console.log(`Start ${i + 1}/${insertList.length}`)
        const lastAddress = insertList[i].addressList.get(BigInt(Number(insertList[i].count) - 1))!
        const whiteListCount = await nftCollection.getIsWhiteList(lastAddress)
        console.log({whiteListCount, lastAddress})
        if (whiteListCount === null) {
            let sent = false
            while (!sent) {
                try {
                    const seqno = await getSeqNo(provider, wallet.address);
                    await nftCollection.send(
                        sender,
                        {
                            value: toNano('1'),
                        },
                        {
                            $$type: "InsertWhiteListParams",
                            addressList: insertList[i].addressList,
                            quotaList: insertList[i].quotaList,
                            count: insertList[i].count
                        }
                    )

                    if (await waitSeqNoChange(provider, wallet.address, seqno)) {
                        sent = true
                    }
                } catch (e) {
                    console.log("Sent Fail, Retry.")
                    sent = false
                }
            }
        }
    }


    ui.clearActionPrompt();
}
