const CustomerContact = require('./thirdparty/customer-contact');
const CustomerContactDAO = require('./thirdparty/customer-contact-dao');

module.exports = class CustomerContactService {
    constructor(customerContactDAO: CustomerContactDAO) {
        this.customerContactDAO = customerContactDAO;
    }

    findCustomerContactDetailsByCustomerId(customerId) {
        return this.customerContactDAO.findById(customerId);
    }

    updateCustomerContactDetails(customerContactDetails: CustomerContact) {
        this.customerContactDAO.update(customerContactDetails);
    }
};
