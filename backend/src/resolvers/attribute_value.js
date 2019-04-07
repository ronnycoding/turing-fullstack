export default {
	Query: {
		attribute_values: async (parent, args, { models }) => models.AttributeValue.findAll(),

		attribute_value: async (parent, { attribute_value_id }, { models }) => models.AttributeValue.findByPk(attribute_value_id),
		getAttributeValuesByAttributeId: async (parent, { attribute_id }, { models }) => {
			const attribute = await models.Attribute.findByPk(attribute_id)
			return attribute.getAttributeValue()
		},
		getAttributeValuesByProductId: async (parent, { product_id }, { models }) => {
			const ProductAttributeValues =				(await models.ProductAttribute.findAll({
					where: {
						product_id,
					},
				})) || []

			const attributeValueIds = ProductAttributeValues.map(({ attribute_value_id }) => attribute_value_id)

			return models.AttributeValue.findAll({
				where: {
					attribute_value_id: attributeValueIds,
				},
			})
		},
	},
}
