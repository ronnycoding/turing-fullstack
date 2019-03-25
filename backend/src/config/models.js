function getModels(sequelize) {
  return {
    // AttributeValue
    // AttributeValue: sequelize.import('./attribute_value'),
    // Attribute: sequelize.import('./attribute'),
    // Audit: sequelize.import('./audit'),
    // Category: sequelize.import('./category'),
    Customer: sequelize.import('../models/customer'),
    // Department: sequelize.import('./deparment'),
    // OrderDetail: sequelize.import('./order_detail'),
    // Orders: sequelize.import('./orders'),
    // ProductAttribute: sequelize.import('./product_attribute'),
    // ProductCategory: sequelize.import('./product_category'),
    // Product: sequelize.import('./product'),
    // Review: sequelize.import('./review'),
    // ShippingRegion: sequelize.import('./shipping_region'),
    // ShoppingCart: sequelize.import('./shopping_cart'),
    // Tax: sequelize.import('./tax')
  };
}

module.exports = { getModels };
