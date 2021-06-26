const CustomerContact = require('./thirdparty/customer-contact');
const CustomerContactDAO = require('./thirdparty/customer-contact-dao');

module.exports = class CustomerContactService {
  constructor(customerContactDAO) {
    this.customerContactDAO = customerContactDAO;
  }

  findById(id) {
    return this.customerContactDAO.findById(id);
  }

  update(details) {
    this.customerContactDAO.update(details);
  }
};
