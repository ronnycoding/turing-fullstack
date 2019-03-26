import bcrypt from 'bcrypt';

export default function setModelsRelation(models) {
	const { Customer, ShippingRegion, Attribute, AttributeValue } = models;

	Customer.associate = models => {
		models.Customer.belongsTo(ShippingRegion, {
			as: 'ShippingRegion',
			foreignKey: 'shipping_region_id'
		});
	};

	Customer.findByLogin = async login => {
		let customer = await Customer.findOne({
			where: { name: login }
		});

		if (!customer) {
			customer = await Customer.findOne({
				where: { email: login }
			});
		}

		return customer;
	};

	Customer.beforeCreate(async customer => {
		customer.password = await customer.generatePasswordHash();
	});

	Customer.prototype.generatePasswordHash = async function() {
		const saltRounds = 10;
		return await bcrypt.hash(this.password, saltRounds);
	};

	Customer.prototype.validatePassword = async function(password) {
		return await bcrypt.compare(password, this.password);
	};

	ShippingRegion.associate = models => {
		models.ShippingRegion.hasMany(Customer, {
			foreignKey: 'shipping_region_id'
		});
	};

	Attribute.associate = models => {
		models.Attribute.hasMany(AttributeValue, {
			as: 'AttributeValue',
			foreignKey: 'attribute_id'
		});
	};

	AttributeValue.associate = models => {
		models.AttributeValue.belongsTo(Attribute, {
			as: 'Attribute',
			foreignKey: 'attribute_id'
		});
	};

	return {
		Customer,
		ShippingRegion,
		Attribute,
		AttributeValue
	};
}
