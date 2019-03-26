export default {
	Query: {
		categories: async (parent, args, { models }) => await models.Category.findAll(),
		category: async (parent, { category_id }, { models }) => {
			return await models.Category.findByPk(category_id);
		},
		getCategoriesByDeparmentId: async (parent, { department_id }, { models }) => {
			const deparment = await models.Department.findByPk(department_id);
			return await deparment.getCategory();
		},
		getCategoryByProductId: async (parent, { product_id }, { models }) => {
			const productCategory =
				(await models.ProductCategory.findAll({
					limit: 1,
					where: {
						product_id
					}
				})) || [];

			const { category_id } = productCategory[0] || {};

			return await models.Category.findByPk(category_id);
		}
	}
};
