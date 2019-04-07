import DataType from 'sequelize'
import Attribute from '../models/attribute'
import AttributeValue from '../models/attribute_value'
import Category from '../models/category'
import Customer from '../models/customer'
import Department from '../models/department'
import OrderDetail from '../models/order_detail'
import Order from '../models/orders'
import ProductAttribute from '../models/product_attribute'
import ProductCategory from '../models/product_category'
import Product from '../models/product'
import Review from '../models/review'
import ShippingRegion from '../models/shipping_region'
import Shipping from '../models/shipping'
import ShoppingCart from '../models/shopping_cart'
import Tax from '../models/tax'

export default function getModels(sequelize) {
	return {
		Attribute: Attribute(sequelize, DataType), // sequelize.import('../models/attribute'),
		AttributeValue: AttributeValue(sequelize, DataType),
		// Audit: sequelize.import('../models/audit'),
		Category: Category(sequelize, DataType),
		Customer: Customer(sequelize, DataType),
		Department: Department(sequelize, DataType),
		OrderDetail: OrderDetail(sequelize, DataType),
		Order: Order(sequelize, DataType),
		ProductAttribute: ProductAttribute(sequelize, DataType),
		ProductCategory: ProductCategory(sequelize, DataType),
		Product: Product(sequelize, DataType),
		Review: Review(sequelize, DataType),
		ShippingRegion: ShippingRegion(sequelize, DataType),
		Shipping: Shipping(sequelize, DataType),
		ShoppingCart: ShoppingCart(sequelize, DataType),
		Tax: Tax(sequelize, DataType),
	}
}
