import { combineResolvers } from 'graphql-resolvers'
import { UserInputError } from 'apollo-server'
import { isAuthenticated } from './authorization'

export default {
	Query: {
		getOrdersDetailByOrderId: combineResolvers(isAuthenticated, async (parent, { order_id }, { models }) => models.OrderDetail.findAll({
				where: { order_id },
			})),
	},
	Mutation: {
		createOrderDetail: combineResolvers(isAuthenticated, async (parent, args, { models }) => {
			const { product_id } = args
			const product = await models.Product.findByPk(product_id)
			if (!product) {
				throw new UserInputError(`No product found with product_id ${product_id}.`)
			}
			const { name: product_name, price: unit_cost } = product

			return models.OrderDetail.create({ ...args, product_name, unit_cost })
		}),
		updateOrderDetail: combineResolvers(isAuthenticated, async (parent, { item_id, ...args }, { models }) => {
			const orderDetails = await models.OrderDetail.findByPk(item_id)
			if (!orderDetails) {
				throw new UserInputError('No order detais found.')
			}
			return orderDetails.update({ ...args })
		}),
		deleteOrderDetail: combineResolvers(isAuthenticated, async (parent, { item_id }, { models }) => models.OrderDetail.destroy({
				where: { item_id },
			})),
	},
}
