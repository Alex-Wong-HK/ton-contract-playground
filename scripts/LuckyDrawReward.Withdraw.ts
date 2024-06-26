import {NetworkProvider} from "@ton/blueprint";
import {LuckyDrawReward} from "../build/LuckyDrawReward/tact_LuckyDrawReward";
import {Address, toNano} from "@ton/core";
import {luckyDrawRewardContract} from "../contest/contractConifg";
import {getSignature_LuckyDrawReward} from "./LuckyDrawReward.Claim";

export async function run(provider: NetworkProvider) {
    const luckyDrawReward = provider.open(LuckyDrawReward.fromAddress(Address.parse(luckyDrawRewardContract[provider.network()])));
    await luckyDrawReward.send(
        provider.sender(),
        {
            value: toNano('0.1'),
        },
        "withdraw all"
    );
}
