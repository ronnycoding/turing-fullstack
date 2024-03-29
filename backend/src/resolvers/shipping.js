import { UserInputError } from 'apollo-server'

export default {
	Query: {
		shippings: async (parent, args, { models }) => models.Shipping.findAll(),
		shipping: async (parent, { shipping_id }, { models }) => models.Shipping.findByPk(shipping_id),
		getShippingsByShippingRegionId: async (parent, { shipping_region_id }, { models }) => {
			const shippingRegion = await models.ShippingRegion.findByPk(shipping_region_id)
			if (!shippingRegion) {
				throw new UserInputError('No shipping region found.')
			}
			return shippingRegion.getShippings()
		},
	},
}
