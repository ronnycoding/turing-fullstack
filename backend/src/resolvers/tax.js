import { UserInputError } from 'apollo-server';
export default {
	Query: {
		taxes: async (parent, args, { models }) => await models.Tax.findAll(),
		tax: async (parent, { tax_id }, { models }) => {
			return await models.Tax.findByPk(tax_id);
		},
		getTaxByOrderId: async (parent, { order_id }, { models }) => {
			const order = await models.Order.findByPk(order_id);
			if (!order) {
				throw new UserInputError('No order found.');
			}
			return await order.getTax();
		}
	}
};
