import { gql } from 'apollo-server-express'

export default gql`
	extend type Query {
		shippings: [Shipping]
		shipping(shipping_id: ID!): Shipping
		getShippingsByShippingRegionId(shipping_region_id: ID!): [Shipping]
	}

	type Shipping {
		shipping_id: ID!
		shipping_type: String!
		shipping_cost: Float!
		shipping_region_id: ID!
	}
`
