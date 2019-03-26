import { gql } from 'apollo-server-express';
import customerSchema from './customer';
import chippingRegionSchema from './shipping_region';
import attributeRegionSchema from './attribute';
import attributeValueSchema from './attribute_value';
import departmentSchema from './department';
import productCategorySchema from './product_category';
import categorySchema from './category';
import productSchema from './product';
import productAttributeSchema from './product_attribute';
import ShippingSchema from './shipping';
import reviewSchema from './review';

const linkSchema = gql`
	scalar Date

	type Query {
		_: Boolean
	}

	type Mutation {
		_: Boolean
	}

	type Subscription {
		_: Boolean
	}
`;

export default [
	linkSchema,
	customerSchema,
	chippingRegionSchema,
	attributeRegionSchema,
	attributeValueSchema,
	departmentSchema,
	productCategorySchema,
	categorySchema,
	productSchema,
	productAttributeSchema,
	ShippingSchema,
	reviewSchema
];
