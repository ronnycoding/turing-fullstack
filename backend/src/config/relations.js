import bcrypt from 'bcrypt'

export default function setModelsRelation(modelsWithRelation) {
	const {
		Customer,
		ShippingRegion,
		Attribute,
		AttributeValue,
		Department,
		Category,
		Product,
		Shipping,
		Review,
		Order,
		Tax,
		OrderDetail,
		ShoppingCart,
	} = modelsWithRelation

	Customer.associate = (models) => {
		models.Customer.belongsTo(ShippingRegion, {
			as: 'ShippingRegion',
			foreignKey: 'shipping_region_id',
		})

		models.Customer.hasMany(Review, {
			as: 'Reviews',
			foreignKey: 'customer_id',
		})

		models.Customer.hasMany(Order, {
			as: 'Orders',
			foreignKey: 'customer_id',
		})
	}

	Customer.findByLogin = async (login) => {
		let customer = await Customer.findOne({
			where: { name: login },
		})

		if (!customer) {
			customer = await Customer.findOne({
				where: { email: login },
			})
		}

		return customer
	}

	Customer.beforeCreate(async (customer) => {
		// eslint-disable-next-line no-param-reassign
		customer.password = await customer.generatePasswordHash()
	})

	Customer.prototype.generatePasswordHash = async function generatePasswordHash() {
		const saltRounds = 10
		return bcrypt.hash(this.password, saltRounds)
	}

	Customer.prototype.validatePassword = async function validatePassword(password) {
		return bcrypt.compare(password, this.password)
	}

	ShippingRegion.associate = (models) => {
		models.ShippingRegion.hasMany(Customer, {
			foreignKey: 'shipping_region_id',
		})

		models.ShippingRegion.hasMany(Shipping, {
			as: 'Shippings',
			foreignKey: 'shipping_region_id',
		})
	}

	Attribute.associate = (models) => {
		models.Attribute.hasMany(AttributeValue, {
			as: 'AttributeValue',
			foreignKey: 'attribute_id',
		})
	}

	AttributeValue.associate = (models) => {
		models.AttributeValue.belongsTo(Attribute, {
			as: 'Attribute',
			foreignKey: 'attribute_id',
		})
	}

	Department.associate = (models) => {
		models.Department.hasMany(Category, {
			as: 'Category',
			foreignKey: 'department_id',
		})
	}

	Category.associate = (models) => {
		models.Category.belongsTo(Department, {
			as: 'Department',
			foreignKey: 'department_id',
		})

		// models.Category.belongsToMany(Product, {
		// 	through: ProductCategory,
		// 	foreignKey: 'category_id',
		// 	as: 'Products'
		// });
	}

	Product.associate = (models) => {
		// models.Product.belongsTo(Category, {
		// 	through: ProductCategory,
		// 	foreignKey: 'product_id',
		// 	as: 'Category'
		// });
		models.Product.hasMany(Review, {
			as: 'Reviews',
			foreignKey: 'product_id',
		})

		models.Product.hasMany(OrderDetail, {
			as: 'OrderDetails',
			foreignKey: 'product_id',
		})

		models.Product.hasMany(ShoppingCart, {
			as: 'ShoppingCart',
			foreignKey: 'product_id',
		})
	}

	Shipping.associate = (models) => {
		models.Shipping.belongsTo(ShippingRegion, {
			as: 'ShippingRegion',
			foreignKey: 'shipping_region_id',
		})

		models.Shipping.hasMany(Order, {
			as: 'Orders',
			foreignKey: 'shipping_id',
		})
	}

	Review.associate = (models) => {
		models.Review.belongsTo(Customer, {
			as: 'Customer',
			foreignKey: 'customer_id',
		})

		models.Review.belongsTo(Product, {
			as: 'Product',
			foreignKey: 'product_id',
		})
	}

	Order.associate = (models) => {
		models.Order.belongsTo(Customer, {
			as: 'Customer',
			foreignKey: 'customer_id',
		})

		models.Order.belongsTo(Shipping, {
			as: 'Shipping',
			foreignKey: 'shipping_id',
		})

		models.Order.belongsTo(Tax, {
			as: 'Tax',
			foreignKey: 'tax_id',
		})

		models.Order.hasMany(OrderDetail, {
			as: 'OrderDetail',
			foreignKey: 'order_id',
		})
	}

	Tax.associate = (models) => {
		models.Tax.hasMany(Order, {
			as: 'Orders',
			foreignKey: 'tax_id',
		})
	}

	OrderDetail.associate = (models) => {
		models.OrderDetail.belongsTo(Order, {
			as: 'Order',
			foreignKey: 'order_id',
		})

		models.OrderDetail.belongsTo(Product, {
			as: 'Product',
			foreignKey: 'product_id',
		})
	}

	ShoppingCart.associate = (models) => {
		models.ShoppingCart.belongsTo(Product, {
			as: 'Product',
			foreignKey: 'product_id',
		})
	}

	return {
		...modelsWithRelation,
		Customer,
		ShippingRegion,
		Attribute,
		AttributeValue,
		Department,
		Category,
		Product,
		Review,
		Order,
		Tax,
		OrderDetail,
		ShoppingCart,
	}
}
