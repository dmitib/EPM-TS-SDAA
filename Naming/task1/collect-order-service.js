const { message } = require('./thirdparty/message');

module.exports = class CollectOrderService {
    constructor(arg1, arg2) {
        this.ser1 = arg1;
        this.ser2 = arg2;
    }

    submitOrder(pOrder) {
        if (this.ser1.isEligibleForCollection(pOrder))
            this.ser2.notifyCustomer(message.READY_FOR_COLLECT, 4); // 4 - info notification level
        else
            this.ser2.notifyCustomer(message.IMPOSSIBLE_TO_COLLECT, 1); // 1 - critical notification level
    }

    setSer1(ser1) {
        this.ser1 = ser1;
    }

    setSer2(ser2) {
        this.ser2 = ser2;
    }
};
