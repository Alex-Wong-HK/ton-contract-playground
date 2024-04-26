import {Address, Dictionary} from "@ton/core";
import {userAddress} from "../../contest/xplusUser";

export const convertMapToWhiteList=(list:{address: string, quota: string}[]):Dictionary<Address, bigint>=>{
    const whiteList : Dictionary<Address,bigint>=  Dictionary.empty<Address, bigint>();
    list.slice(0,500).map((x)=>{
        whiteList.set(Address.parse(x.address),BigInt(+x.quota))
    })

    return whiteList
}

interface IInsertWhiteList{
    addressList:Dictionary<bigint,Address>;
    quotaList:Dictionary<bigint,bigint>;
    count:bigint;
}

export const convertMapToInsertWhiteList=(list:{address: string, quota: string}[]): IInsertWhiteList[]=>{
    let c_addressList:string[] = userAddress


    const listCount = c_addressList.length
    const branchSize = 50

    const listToContract : IInsertWhiteList[] = []

    let batch:string[];
    let objectCount = 0
    while (c_addressList.length > 0) {
        console.log(c_addressList.length)
        batch = c_addressList.splice(0,branchSize)
        const addressList : Dictionary<bigint,Address>=  Dictionary.empty<bigint, Address>();
        const quotaList : Dictionary<bigint,bigint>=  Dictionary.empty<bigint, bigint>();

        for(let i = 0 ; i<batch.length;i++){
            const quota = list.find((x)=>Address.parse(x.address).toString()=== Address.parse(batch[i]).toString())

            objectCount++;
            addressList.set(BigInt(i),Address.parse(batch[i]))
            quotaList.set(BigInt(i),BigInt(quota?2:1))
        }
        listToContract.push({
            addressList,
            quotaList,
            count:BigInt(batch.length)
        })
    }

    return listToContract

}
