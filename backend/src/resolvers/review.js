import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated } from './authorization';
import { UserInputError } from 'apollo-server';
export default {
	Query: {
		review: async (parent, { review_id }, { models }) => {
			return await models.Review.findByPk(review_id);
		},
		getReviewsByProductId: async (parent, { product_id }, { models }) => {
			const product = await models.Product.findByPk(product_id);
			if (!product) {
				throw new UserInputError('No product found.');
			}
			return await product.getReviews();
		},
		getReviewsByCustomerId: async (parent, { customer_id }, { models }) => {
			const customer = await models.Customer.findByPk(customer_id);
			if (!customer) {
				throw new UserInputError('No customer found.');
			}
			return await customer.getReviews();
		}
	},
	Mutation: {
		createReview: combineResolvers(isAuthenticated, async (parent, args, { models, me }) => {
			const { customer_id } = me;
			return await models.Review.create({
				customer_id,
				created_on: new Date(),
				...args
			});
		}),
		updateReview: combineResolvers(isAuthenticated, async (parent, { review_id, ...args }, { models }) => {
			const review = await models.Review.findByPk(review_id);
			if (!review) {
				throw new UserInputError('No review found.');
			}
			return await review.update({ ...args });
		}),
		deleteReview: combineResolvers(isAuthenticated, async (parent, { review_id }, { models, me }) => {
			const { customer_id } = me;
			return await models.Review.destroy({
				where: { customer_id, review_id }
			});
		})
	}
};
