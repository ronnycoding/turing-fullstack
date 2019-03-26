function getModels(sequelize) {
	return {
		Attribute: sequelize.import('../models/attribute'),
		AttributeValue: sequelize.import('../models/attribute_value'),
		// Attribute: sequelize.import('../models/attribute'),
		// Audit: sequelize.import('../models/audit'),
		Category: sequelize.import('../models/category'),
		Customer: sequelize.import('../models/customer'),
		Department: sequelize.import('../models/department'),
		// OrderDetail: sequelize.import('../models/order_detail'),
		// Orders: sequelize.import('../models/orders'),
		ProductAttribute: sequelize.import('../models/product_attribute'),
		ProductCategory: sequelize.import('../models/product_category'),
		Product: sequelize.import('../models/product'),
		Review: sequelize.import('../models/review'),
		ShippingRegion: sequelize.import('../models/shipping_region'),
		Shipping: sequelize.import('../models/shipping')
		// ShoppingCart: sequelize.import('../models/shopping_cart'),
		// Tax: sequelize.import('../models/tax')
	};
}

module.exports = { getModels };
