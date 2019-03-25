import { gql } from 'apollo-server-express';
import customerSchema from './customer';
import chippingRegionSchema from './shipping_region';

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

export default [linkSchema, customerSchema, chippingRegionSchema];
