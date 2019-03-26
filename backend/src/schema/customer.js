import { gql } from 'apollo-server-express';

export default gql`
	extend type Query {
		customers: [Customer!]
		customer(customer_id: ID!): Customer
		me: Customer
	}

	extend type Mutation {
		signUp(name: String!, email: String!, password: String!): Token!
		signIn(login: String!, password: String!): Token!
		updateCustomer(
			name: String
			email: String
			password: String
			credit_card: String
			address_1: String
			address_2: String
			city: String
			region: String
			postal_code: String
			country: String
			day_phone: String
			eve_phone: String
			mob_phone: String
		): Customer!
		deleteCustomer(customer_id: ID!): Boolean!
	}

	type Token {
		token: String!
	}

	type Customer {
		customer_id: ID!
		name: String!
		email: String!
		password: String!
		credit_card: String
		address_1: String
		address_2: String
		city: String
		region: String
		postal_code: String
		country: String
		shipping_region_id: ID!
		day_phone: String
		eve_phone: String
		mob_phone: String
	}
`;
