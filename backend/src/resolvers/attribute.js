export default {
	Query: {
		attributes: async (parent, args, { models }) => models.Attribute.findAll(),

		attribute: async (parent, { attribute_id }, { models }) => models.Attribute.findById(attribute_id),
	},
}
