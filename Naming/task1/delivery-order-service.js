const NotDeliverableOrderError = require('./thirdparty/not-deliverable-order-error');

module.exports = class DeliveryOrderService {
    constructor(arg1, arg2) {
        this.mDeliveryService = arg1;
        this.mOrderFulfilmentService = arg2;
    }

    submitOrder(pOrder) {
        if (this.mDeliveryService.isDeliverable(pOrder)) {
            const products = pOrder.getProducts();
            this.mOrderFulfilmentService.fulfilProducts(products);
        } else {
            throw new NotDeliverableOrderError();
        }
    }

    setDeliveryService(pDeliveryService) {
        this.mDeliveryService = pDeliveryService;
    }

    setOrderFulfilmentService(pOrderFulfilmentService) {
        this.mOrderFulfilmentService = pOrderFulfilmentService;
    }
};
