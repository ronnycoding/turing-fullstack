export default {
	Query: {
		shippingRegions: async (parent, args, { models }) => await models.ShippingRegion.findAll(),
		shippingRegion: async (parent, { shipping_region_id }, { models }) => {
			return await models.ShippingRegion.findById(shipping_region_id);
		},
		getCustomerShippingRegion: async (parent, { customer_id }, { models }) => {
			const customer = await models.Customer.findByPk(customer_id);
			return await customer.getShippingRegion();
		}
	}
};
