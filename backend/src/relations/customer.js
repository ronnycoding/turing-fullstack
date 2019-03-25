import Sequelize from 'sequelize';

function getCustomer(sequelize) {
  const Customer = sequelize.import('../generated/customer');
  return new Customer(sequelize, Sequelize.DataTypes);
  // Customer.hasMay(otherModel);
  // Customer.belongsTo(otherModel);
  // return Customer;
}

module.exports = {
  getCustomer,
};
