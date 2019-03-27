import { gql } from 'apollo-server-express';

export default gql`
	extend type Query {
		taxes: [Tax!]
		tax(tax_id: ID!): Tax!
		getTaxByOrderId(order_id: ID!): Tax
	}

	type Tax {
		tax_id: ID!
		tax_type: String!
		tax_percentage: Float!
	}
`;
