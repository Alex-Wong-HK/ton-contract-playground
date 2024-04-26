import "@stdlib/deploy";

message TransferEvent {
    singer: Address;
    bizId: Int as uint256;
}

message CheckInParam{
    bizId:String;
}

contract Checkin with Deployable {
    checkinCount: map<Address,Int>;
    count: Int as uint32 = 0;
    deployer: Address;

    init() {
        self.deployer = sender();
    }

    fun onlyDeployer() {
        require(sender() == self.deployer, "Only the deployer is permitted here");
    }

    receive(msg:CheckInParam){
        self.count  = self.count + 1;
        self.reply((msg.bizId).asComment());
        //emit(TransferEvent{singer:sender(), callTime:now()}.toCell());
        //emit(TransferEvent{singer:sender(), bizId:msg.bizId}.toCell());   // If use Reply Can't emit
    }

    get fun getCount():Int{
        return self.count;
    }

    get fun test():Cell{

        return (self.count.toString()).asComment();
    }


}
