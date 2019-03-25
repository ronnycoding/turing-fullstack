export const batchCustomers = async (keys, models) => {
  const customers = await models.Customer.findAll({
    where: {
      customer_id: {
        $in: keys,
      },
    },
  });

  return keys.map(key => customers.find(customer => customer.customer_id === key));
};
