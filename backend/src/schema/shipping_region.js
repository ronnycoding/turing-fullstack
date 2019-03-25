import { gql } from 'apollo-server-express';

export default gql`
	extend type Query {
		shippingRegions: [ShippingRegion!]
		shippingRegion(shipping_region_id: ID!): ShippingRegion
	}

	type ShippingRegion {
		shipping_region_id: ID!
		shipping_region: String!
	}
`;
