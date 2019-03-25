export default {
	Query: {
		shippingRegions: async (parent, args, { models }) => await models.ShippingRegion.findAll(),
		shippingRegion: async (parent, { shipping_region_id }, { models }) =>
			await models.Customer.findById(shipping_region_id)
	}
};
