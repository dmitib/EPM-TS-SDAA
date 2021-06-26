const NotDeliverableOrderError = require('./thirdparty/not-deliverable-order-error');

module.exports = class DeliveryOrderService {
  constructor(deliveryService, orderFulfillmentService) {
    this.deliveryService = deliveryService;
    this.orderFulfillmentService = orderFulfillmentService;
  }

  submitOrder(order) {
    if (this.deliveryService.isDeliverable(order)) {
      const products = order.getProducts();
      this.orderFulfillmentService.makeOrder(products);
    } else {
      throw new NotDeliverableOrderError();
    }
  }

  setDeliveryService(deliveryService) {
    this.deliveryService = deliveryService;
  }

  setOrderFulfillmentService(orderFulfillmentService) {
    this.orderFulfillmentService = orderFulfillmentService;
  }
};
