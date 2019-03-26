import bcrypt from 'bcrypt';

export default function setModelsRelation(models) {
	const { Customer, ShippingRegion } = models;

	Customer.associate = (models) => {
		models.Customer.belongsTo(ShippingRegion, {
			as: 'ShippingRegion',
			foreignKey: 'shipping_region_id'
		});
	}

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

	ShippingRegion.associate = (models) => {
		models.ShippingRegion.hasMany(Customer, {
			foreignKey: 'shipping_region_id'
		});
	}

	return {
		Customer,
		ShippingRegion
	};
}
