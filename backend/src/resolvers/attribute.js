export default {
	Query: {
		attributes: async (parent, args, { models }) => await models.Attribute.findAll(),
		attribute: async (parent, { attribute_id }, { models }) => {
			return await models.Attribute.findById(attribute_id);
		}
	}
};
