import {toNano} from '@ton/core';

import {NetworkProvider} from '@ton/blueprint';
import {Inventory} from "../wrappers/Inventroy";
import {mnemonicToWalletKey} from "@ton/crypto";
import {relayer} from "../contest/demoWallet";

export async function getRelayerPublicKey(mnemonics:string[]):Promise<bigint>{
    let par = await mnemonicToWalletKey(mnemonics)
    return BigInt(`0x${par.publicKey.toString("hex")}`)
}

export async function run(provider: NetworkProvider) {
    const owner = provider.sender().address;
    const publicKey = await getRelayerPublicKey(relayer.mnemonics.split(' '))
    const inventory = provider.open(await Inventory.fromInit(publicKey));
    await inventory.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(inventory.address);
}
