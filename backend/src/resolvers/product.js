export default {
	Query: {
		products: async (parent, args, { models }) => await models.Product.findAll(),
		product: async (parent, { product_id }, { models }) => {
			return await models.Product.findByPk(product_id);
		}
	}
};
