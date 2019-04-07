import { combineResolvers } from 'graphql-resolvers'
import { isAuthenticated } from './authorization'

export default {
	Query: {
		getOrdersByCustomerId: async (parent, { customer_id }, { models }) => {
			const order = await models.Customer.findByPk(customer_id)
			if (!order) return null
			return order.getOrders()
		},
		getOrdersByShippingId: async (parent, { shipping_id }, { models }) => {
			const shipping = await models.Shipping.findByPk(shipping_id)
			if (!shipping) return null
			return shipping.getOrders()
		},
	},
	Mutation: {
		createOrder: combineResolvers(isAuthenticated, async (parent, { status = 0, ...args }, { models, me }) => {
			const { customer_id } = me
			return models.Order.create({
				...args,
				status,
				customer_id,
				created_on: new Date(),
			})
		}),
		updateOrder: combineResolvers(
			isAuthenticated,
			async (parent, {
 created_on, order_id, status, ...args
}, { models }) => {
				const order = await models.Order.findByPk(order_id)
				const s = status || order.status
				return order.update({ ...args, status: s })
			},
		),

		deleteOrder: combineResolvers(isAuthenticated, async (parent, { order_id }, { models, me }) => {
			const { customer_id } = me
			return models.Order.destroy({
				where: { customer_id, order_id },
			})
		}),
	},
}
