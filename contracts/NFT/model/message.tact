message(0x5fcc3d14) Transfer {
    query_id: Int as uint64;
    new_owner: Address;
    response_destination: Address?;
    custom_payload: Cell?;
    forward_amount: Int as coins;
    forward_payload: Slice as remaining;
}
message(0x05138d91) OwnershipAssigned {
    query_id: Int as uint64;
    prev_owner: Address;
    forward_payload: Slice as remaining;
}
message(0xd53276db) Excesses {
    query_id: Int as uint64;
}
message(0x2fcb26a2) GetStaticData {
    query_id: Int as uint64;
}
message(0x8b771735) ReportStaticData {
    query_id: Int as uint64;
    index_id: Int;
    collection: Address;
}

message(0x693d3950) GetRoyaltyParams {
    query_id: Int as uint64;
}
message(0xa8cb00ad) ReportRoyaltyParams {
    query_id: Int as uint64;
    numerator: Int as uint16;
    denominator: Int as uint16;
    destination: Address;
}

message StakingParams{
    query_id: Int as uint64;
    nftAddress: Address;
    owner:Address;
}

message WithdrawParams{
    signature: Slice as bytes64;
    seqno:Int as uint32;
    ownerAddress:Address; // Nft'Owner Wallet address
    nftIndex: Int as uint32;
}

message XPlusMintParams{
    signature: Slice as bytes64;
    ownerAddress:Address;
    item_index:Int as uint32;
}

message UpdateWhiteListParams{
    newList: map<Address,Int>;
}

message TopupEvent {
    amount: Int as coins;
}

message UpdateMintRecord{
    newList: map<Int,Address>;
}

message UpdatePhaseConfigParams{
    newConfig: NftPhaseConfig;
    targetPhase: Int as uint32;
}


message InsertWhiteListParams{
    addressList:map<Int,Address>;
    quotaList:map<Int,Int>;
    count:Int;
}
