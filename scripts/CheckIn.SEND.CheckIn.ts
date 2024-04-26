import {Address, beginCell, toNano} from '@ton/core';
import {Checkin} from '../wrappers/Checkin';
import {NetworkProvider, sleep} from '@ton/blueprint';
import {TonClient, TonClient4} from "@ton/ton";
import _ from "lodash";
import {getSeqNo, waitSeqNoChange} from "./util/getHashBySeqno";
import {checkInContract} from "../contest/contractConifg";



export async function awaitConfirmation(fn: () => Promise<boolean>) {
    console.log(` - Waiting up to 45 seconds to confirm operation`);
    let successFlag = 0;
    for (let attempt = 0; attempt < 45; attempt++) {
        await sleep(1000);
        let res = false
        try {
            res = await fn()
        } catch {
        }

        if (res) {
            successFlag = 1
            break
        }
    }
    if (!successFlag) {
        console.log(` - Error confirming operation`);
        return false;
    }
    return true;
}


export async function run(provider: NetworkProvider, args: string[]) {
    console.log(provider.network())
    const ui = provider.ui();
    const address = Address.parse(checkInContract[provider.network()]);
    if (!(await provider.isContractDeployed(address))) {
        ui.write(`Error: Contract at address ${address} is not deployed!`);
        return;
    }
    const checkin = provider.open(Checkin.fromAddress(address));
    const seqno = await getSeqNo(provider, provider.sender().address!);
    const tx = await checkin.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type:"CheckInParam",
            bizId:"nonce:1783008328403124224"
        }
    );

    if (await waitSeqNoChange(provider, provider.sender().address!, seqno)) {
        if (await awaitConfirmation(async () => {
            return true
        })) {
            console.log(` - Successfully confirmed tx`)
        } else {
            console.log(` - Error confirming tx`)
        }
    }
}
