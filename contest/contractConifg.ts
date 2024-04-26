interface IContractAddress{
    mainnet:string,
    testnet:string,
    custom:string
}
export const checkInContract:IContractAddress = {
    mainnet:"EQB8KUcRfK28qGstsRk6_raI9ZrJDXUmxS8W9sMDNakiuCIc",
    testnet:"EQCU80ddWxsL0JFiRh3pYxDqwPG777t4qDBv6wde7MpsyJTH",
    custom:""
}

export const inventoryContract:IContractAddress = {
    mainnet:"EQBbAHNpcGUQNs_s1sB1iUhUfcd6cdS2R4VbV0G8ErNtoeDi",
    testnet:"kQDInhIS9Zznf5f3kl42LabuCbQ8aKDC--fyFwfYSUgWkXUc",
    custom:""
}

export const nftCollectionContract:IContractAddress = {
    mainnet:"EQD4-peNeFh7IqZdy-oXoyoHoPVyNP0K1RNY3xTeYj8tenCP",
    testnet:"EQDcjpQF0j9kLNDhkfxOOc0Krh51hLhoDG_IzOu5vPEaZhhS",
    custom:""
}

export const luckyDrawRewardContract:IContractAddress = {
    mainnet:"EQCN0ttSHJDyNrIqxpImMDmAy__gAyNWiD5GjDWCDwTZPUEF",
    testnet:"EQAW98-ODa1_lFmjwsTHuD48Ou26SHs0Xwti2cIly-k55gNp",
    custom:""
}


interface IRpc{
    mainnet:{
        endpoint:string
        apiKey:string
    };
    testnet:{
        endpoint:string;
        apiKey:string
    }

}
export const rpc:IRpc = {
    testnet:{
        endpoint:"https://testnet.toncenter.com/api/v2/jsonRPC",
        apiKey:"e4f724d05971ec05afedc55f6b1d696aca177adac0056e6eb191ddb426c16583"
    },
    mainnet:{
        endpoint:"https://toncenter.com/api/v2/jsonRPC",
        apiKey:"9b9b49fb8c45041d21f079ee59080ae7e90d785ae19d5a25e87f27e677c5b639"
    }
}
