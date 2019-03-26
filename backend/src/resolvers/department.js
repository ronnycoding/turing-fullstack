export default {
	Query: {
		departments: async (parent, args, { models }) => await models.Department.findAll(),
		department: async (parent, { department_id }, { models }) => {
			return await models.Department.findByPk(department_id);
		},
		getDepartmentByCategoryId: async (parent, { category_id }, { models }) => {
			const category = await models.Category.findByPk(category_id);
			return await category.getDepartment();
		}
	}
};
