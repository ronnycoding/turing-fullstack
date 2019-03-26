import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated } from './authorization';
export default {
	Query: {
		review: async (parent, { review_id }, { models }) => {
			return await models.Review.findByPk(review_id);
		},
		getReviewsByProductId: async (parent, { product_id }, { models }) => {
			const product = await models.Product.findByPk(product_id);
			return await product.getReviews();
		},
		getReviewsByCustomerId: async (parent, { customer_id }, { models }) => {
			const customer = await models.Customer.findByPk(customer_id);
			return await customer.getReviews();
		}
	},
	Mutation: {
		createReview: combineResolvers(
			isAuthenticated,
			async (parent, { product_id, review, rating }, { models, me }) => {
				const { customer_id } = me;
				return await models.Review.create({
					customer_id,
					product_id,
					review,
					rating,
					created_on: new Date()
				});
			}
		),
		updateReview: combineResolvers(isAuthenticated, async (parent, { review_id, ...args }, { models }) => {
			const review = await models.Review.findByPk(review_id);
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
