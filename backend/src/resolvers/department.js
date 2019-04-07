export default {
	Query: {
		departments: async (parent, args, { models }) => models.Department.findAll(),
		department: async (parent, { department_id }, { models }) => models.Department.findByPk(department_id),
		getDepartmentByCategoryId: async (parent, { category_id }, { models }) => {
			const category = await models.Category.findByPk(category_id)
			return category.getDepartment()
		},
	},
}
