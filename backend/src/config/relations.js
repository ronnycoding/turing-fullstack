export default function setModelsRelation(models) {
	const { Customer, ShippingRegion } = models;

	Customer.belongsTo(Customer, {
		as: 'ShippingRegion',
		foreignKey: 'shipping_region_id'
	});

	ShippingRegion.hasMany(Customer, {
		as: 'Customer',
		foreignKey: 'shipping_region_id'
	});

	return {
		Customer,
		ShippingRegion
	};
}
