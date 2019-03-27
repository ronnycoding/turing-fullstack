import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated } from './authorization';
import { UserInputError } from 'apollo-server';
export default {
	Query: {
		getOrdersDetailByOrderId: combineResolvers(isAuthenticated, async (parent, { order_id }, { models, me }) => {
			return await models.OrderDetail.findAll({
				where: { order_id }
			});
		})
	},
	Mutation: {
		createOrderDetail: combineResolvers(isAuthenticated, async (parent, args, { models }) => {
			const { product_id } = args;
			const product = await models.Product.findByPk(product_id);
			if (!product) {
				throw new UserInputError(`No product found with product_id ${product_id}.`);
			}
			const { name: product_name, price: unit_cost } = product;

			return await models.OrderDetail.create({ ...args, product_name, unit_cost });
		}),
		updateOrderDetail: combineResolvers(isAuthenticated, async (parent, { item_id, ...args }, { models }) => {
			const orderDetails = await models.OrderDetail.findByPk(item_id);
			if (!orderDetails) {
				throw new UserInputError('No order detais found.');
			}
			return await orderDetails.update({ ...args });
		}),
		deleteOrderDetail: combineResolvers(isAuthenticated, async (parent, { item_id }, { models }) => {
			return await models.OrderDetail.destroy({
				where: { item_id }
			});
		})
	}
};
