import {NetworkProvider} from "@ton/blueprint";
import {Address, fromNano} from "@ton/core";
import {nftCollectionContract} from "../contest/contractConifg";
import {NftCollection} from "../build/XplusAtTonNFT/tact_NftCollection";
import {convertDateFromContract} from "./util/dateTimeTools";

export async function run(provider: NetworkProvider, args: string[]) {
    const ui = provider.ui();
    const _address = Address.parse(nftCollectionContract[provider.network()]);
    if (!(await provider.isContractDeployed(_address))) {
        ui.write(`Error: Contract at address ${_address} is not deployed!`);
        return;
    }
    const nftCollection = provider.open(NftCollection.fromAddress(_address));
    const mintingStatus = await nftCollection.getGetPhaseConfig()
    console.log({
        phase1:{
            start:convertDateFromContract(mintingStatus.phase1.startDate),
            end:convertDateFromContract(mintingStatus.phase1.endDate),
            price:fromNano(mintingStatus.phase1.price),
        },
        phase2:{
            start:convertDateFromContract(mintingStatus.phase2.startDate),
            end:convertDateFromContract(mintingStatus.phase2.endDate),
            price:fromNano(mintingStatus.phase2.price),
        },
        mintedCount:mintingStatus.mintedCount,
        totalSupply:mintingStatus.totalSupply
    })
    ui.clearActionPrompt();
}
