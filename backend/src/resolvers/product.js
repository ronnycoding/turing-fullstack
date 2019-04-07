export default {
	Query: {
		products: async (parent, args, { models }) => models.Product.findAll(),
		product: async (parent, { product_id }, { models }) => models.Product.findByPk(product_id),
		getProductsByCategoryId: async (parent, { category_id }, { models }) => {
			const categoryProducts =				(await models.ProductCategory.findAll({
					where: {
						category_id,
					},
				})) || []

			const productIds = categoryProducts.map(({ product_id }) => product_id)

			return models.Product.findAll({
				where: {
					product_id: productIds,
				},
			})
		},
		getProductsByAttributeValueId: async (parent, { attribute_value_id }, { models }) => {
			const attributeValueProducts =				(await models.ProductAttribute.findAll({
					where: {
						attribute_value_id,
					},
				})) || []

			const productIds = attributeValueProducts.map(({ product_id }) => product_id)

			return models.Product.findAll({
				where: {
					product_id: productIds,
				},
			})
		},
	},
}
