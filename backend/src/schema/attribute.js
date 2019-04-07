import { gql } from 'apollo-server-express'

export default gql`
	extend type Query {
		attributes: [Attribute!]
		attribute(attribute_id: ID!): Attribute
	}

	type Attribute {
		attribute_id: ID!
		name: String!
	}
`
