import { UserInputError } from 'apollo-server'

export default {
	Query: {
		shippingRegions: async (parent, args, { models }) => models.ShippingRegion.findAll(),
		shippingRegion: async (parent, { shipping_region_id }, { models }) => models.ShippingRegion.findByPk(shipping_region_id),
		getShippingRegionByCustomerId: async (parent, { customer_id }, { models }) => {
			const customer = await models.Customer.findByPk(customer_id)
			if (!customer) {
				throw new UserInputError('No customer found.')
			}
			return customer.getShippingRegion()
		},
		getShippingRegionByShippingId: async (parent, { shipping_id }, { models }) => {
			const shipping = await models.Shipping.findByPk(shipping_id)
			if (!shipping) {
				throw new UserInputError('No shipping found.')
			}
			return shipping.getShippingRegion()
		},
	},
}
