module.exports = class Order {
  getPriceOfAvailableProducts() {
    this.setAvailableProducts();
    const orderPrice = this.getOrderPrice();
    return orderPrice;
  }

  getOrderPrice() {
    let orderPrice = 0;
    const products = this.getProducts();

    for (const product of products) {
      orderPrice += product.productPrice;
    }

    return orderPrice;
  }

  setAvailableProducts() {
    const availableProducts = this.getAvailableProducts();
    this.setProducts(availableProducts);
  }

  getAvailableProducts() {
    const products = this.getProducts()
    return this.getProductsAvailable(products);
  }

  getProductsAvailable(products) {
    return products.filter((product) => product.isAvailable);
  }

  setProducts(products) {
    this.products = products;
  }

  getProducts() {
    return this.products;
  }
};
