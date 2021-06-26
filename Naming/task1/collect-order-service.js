const { message } = require('./thirdparty/message');

module.exports = class CollectOrderService {
    static INFO_NOTIFICATION_LEVEL_CRITICAL = 1;
    static INFO_NOTIFICATION_LEVEL_LOW = 4;

    constructor(orderService, customerService) {
        this.orderService = orderService;
        this.customerService = customerService;
    }

    submitOrder(pOrder) {
        if (this.orderService.isEligibleForCollection(pOrder))
            this.customerService.notifyCustomer(message.READY_FOR_COLLECT, CollectOrderService.INFO_NOTIFICATION_LEVEL_LOW);
        else
            this.customerService.notifyCustomer(message.IMPOSSIBLE_TO_COLLECT, CollectOrderService.INFO_NOTIFICATION_LEVEL_CRITICAL);
    }

    setOrderService(service) {
        this.orderService = service;
    }

    setCustomerService(service) {
        this.customerService = service;
    }
};
