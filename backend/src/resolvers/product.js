export default {
	Query: {
		products: async (parent, args, { models }) => await models.Product.findAll(),
		product: async (parent, { product_id }, { models }) => {
			return await models.Product.findByPk(product_id);
		},
		getProductsByCategoryId: async (parent, { category_id }, { models }) => {
			const categoryProducts =
				(await models.ProductCategory.findAll({
					where: {
						category_id
					}
				})) || [];

			const productIds = categoryProducts.map(({ product_id }) => product_id);

			return await models.Product.findAll({
				where: {
					product_id: productIds
				}
			});
		}
	}
};
