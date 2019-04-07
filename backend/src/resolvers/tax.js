import { UserInputError } from 'apollo-server'

export default {
	Query: {
		taxes: async (parent, args, { models }) => models.Tax.findAll(),
		tax: async (parent, { tax_id }, { models }) => models.Tax.findByPk(tax_id),
		getTaxByOrderId: async (parent, { order_id }, { models }) => {
			const order = await models.Order.findByPk(order_id)
			if (!order) {
				throw new UserInputError('No order found.')
			}
			return order.getTax()
		},
	},
}
